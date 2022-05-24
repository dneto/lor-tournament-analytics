import {
  BorderAllRounded as GridOnIcon,
  PhotoRounded as PhotoIcon,
  ZoomOutMapRounded as ZoomOutIcon,
  ArrowLeftRounded as BackIcon,
} from "@mui/icons-material";
import {
  Container,
  Fade,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Toolbar,
  Tooltip,
  Typography,
  Box,
} from "@mui/material";
import * as React from "react";

import path from "path";
interface ToolbarProps {
  onZoomOut?: React.MouseEventHandler<HTMLAnchorElement>;
  onBack?: React.MouseEventHandler<HTMLAnchorElement>;
  title: string;
  csvData: string[][];
  csvFilename: string;
  imgRef: React.RefObject<any>;
}

class PagedTableHeader extends React.Component<ToolbarProps> {
  blobURL: string;
  constructor(props: ToolbarProps) {
    super(props);
    this.blobURL = this.getBlobUrl();
  }

  getBlobUrl(): string {
    const data = this.props.csvData.map((r) => r.join(",")).join("\n");
    const blob = new Blob([data], { type: "text/csv" });
    return URL.createObjectURL(blob);
  }

  render() {
    return (
      <>
        <Toolbar sx={{ paddingRight: 0 }}>
          {this.props.onBack && (
            <Tooltip title="Back">
              <IconButton href="#" onClick={this.props.onBack}>
                <BackIcon sx={{ color: "black" }} />
              </IconButton>
            </Tooltip>
          )}
          <Typography
            variant="h6"
            component="div"
            sx={{ flex: "1 1 100%", userSelect: "none" }}
          >
            {this.props.title}
          </Typography>
          <Tooltip title="Download as PNG">
            <IconButton
              onClick={() => {
                import("react-component-export-image").then((r) =>
                  r.exportComponentAsPNG(this.props.imgRef, {
                    html2CanvasOptions: {
                      scale: 2,
                      scrollX: 0,
                      scrollY: -window.scrollY,
                    },
                    fileName: `${path.parse(this.props.csvFilename).name}.png`,
                  })
                );
              }}
            >
              <PhotoIcon sx={{ color: "black" }} fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download as CSV">
            <a
              rel="noreferrer"
              href={this.blobURL}
              target="_blank"
              download={this.props.csvFilename}
            >
              <IconButton>
                <GridOnIcon sx={{ color: "black" }} fontSize="small" />
              </IconButton>
            </a>
          </Tooltip>
          {this.props.onZoomOut && (
            <Tooltip title="Open modal">
              <IconButton href="#" onClick={this.props.onZoomOut}>
                <ZoomOutIcon sx={{ color: "black" }} fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      </>
    );
  }
}

type TableProps<T> = {
  title: string;
  count: number;
  rows: T[];
  maxPercent: number;
  csvFilename: string;
  render(t: T): React.ReactNode;
  csvParser(t: T): string[];
};

type TableState = {
  page: number;
  modalOpen: boolean;
};

class PagedTable<T> extends React.Component<TableProps<T>, TableState> {
  modalStyle = {};

  ref = React.createRef<typeof Paper>();
  modalRef = React.createRef<typeof Paper>();

  constructor(props: TableProps<T>) {
    super(props);
    this.state = { page: 0, modalOpen: false };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  handlePageChange(event: unknown, newPage: number) {
    const state = { ...this.state };
    state.page = newPage;
    this.setState(state);
  }

  openModal() {
    const state = { ...this.state };
    state.modalOpen = true;
    this.setState(state);
  }

  handleModalClose() {
    const state = { ...this.state };
    state.modalOpen = false;
    this.setState(state);
  }

  render() {
    return (
      <>
        <Paper component={Box}>
          <PagedTableHeader
            title={this.props.title}
            onZoomOut={this.openModal}
            csvData={this.props.rows.map(this.props.csvParser)}
            csvFilename={this.props.csvFilename}
            imgRef={this.ref}
          />
          <TableContainer ref={this.ref} component={Box}>
            <Table size="small">
              <TableBody>
                <>
                  {this.props.rows
                    .slice(this.state.page * 5, this.state.page * 5 + 5)
                    .map((r) => {
                      return this.props.render(r);
                    })}
                </>
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5]}
            rowsPerPage={5}
            onPageChange={this.handlePageChange}
            page={this.state.page}
            component="div"
            count={this.props.count}
          />
        </Paper>
        <Modal
          disableAutoFocus
          disableEnforceFocus
          open={this.state.modalOpen}
          onClose={this.handleModalClose}
          component={Box}
          overflow="scroll"
        >
          <Box style={{ border: "0px" }} sx={{ ...this.modalStyle }}>
            <Paper sx={{ border: "0px" }}>
              <Container>
                <PagedTableHeader
                  title={this.props.title}
                  csvData={this.props.rows.map(this.props.csvParser)}
                  csvFilename={this.props.csvFilename}
                  imgRef={this.modalRef}
                  onBack={this.handleModalClose}
                />
                <TableContainer>
                  <Table size="small" ref={this.modalRef} component={Box}>
                    <TableBody>
                      <>
                        {this.props.rows.map((r) => {
                          return this.props.render(r);
                        })}
                      </>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Container>
            </Paper>
          </Box>
        </Modal>
      </>
    );
  }
}

export default PagedTable;
