import * as React from "react";
import { DataProps, DataState } from "./TournamentDataProps";
import _ from "lodash";
import {
  Box,
  Grid,
  Paper,
  TablePagination,
  Tooltip,
  Typography,
} from "@mui/material";
import { PagedTableHeader } from "../PagedTable";
import { cardFromCodeLocale } from "@lor-analytics/deck-utils/card";
import Image from "next/image";

type dataprops = DataProps & {
  data: {
    cardCode: string;
    qty: number;
    percent: number;
  }[];
};

export default class CardsData extends React.Component<dataprops, DataState> {
  ref = React.createRef<typeof Paper>();
  constructor(props: dataprops) {
    super(props);
    this.state = { page: 0 };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(event: unknown, newPage: number) {
    const state = { ...this.state };
    state.page = newPage;
    this.setState(state);
  }

  render(): React.ReactNode {
    const count = this.props.data.map((e) => ({
      ...e,
      card: cardFromCodeLocale(e.cardCode, this.props.locale.locale),
    }));
    const rows = _.sortBy(count, (c) => c.qty).reverse();
    const pageRows =
      this.props.paginated && this.props.rowsPerPage
        ? rows.slice(
            this.props.rowsPerPage * this.state.page,
            this.props.rowsPerPage * this.state.page + this.props.rowsPerPage
          )
        : rows;
    const csvData = rows.map((r) => {
      return [r.cardCode, String(r.qty)];
    });
    return (
      <Paper component={Box} elevation={0}>
        <PagedTableHeader
          title={this.props.locale.cards}
          pageLink={
            this.props.showFullScreenButton
              ? `/tournament/${this.props.pageID}/cards`
              : undefined
          }
          csvData={csvData}
          csvFilename={`${this.props.locale.archetype}_${this.props.title}.csv`}
          imgRef={this.ref}
          showBackButton={this.props.showBackButton}
          locale={this.props.locale}
        />
        <Box sx={{ flexGrow: 1, paddingLeft: "24px", paddingRight: "24px" }}>
          <Grid
            container
            ref={this.ref}
            component={Box}
            spacing={0}
            style={{ width: "100%" }}
          >
            {pageRows.map((r) => {
              return (
                <>
                  <Grid item xs={10} sx={{ marginBottom: "-5px" }}>
                    <Tooltip
                      componentsProps={{
                        tooltip: {
                          sx: {
                            backgroundColor: "#ffffff00",
                          },
                        },
                      }}
                      title={
                        <Image
                          src={r.card.assets[0].gameAbsolutePath}
                          width="250"
                          height="376"
                          alt={r.card.name}
                        />
                      }
                    >
                      <Typography sx={{ fontWeight: 600 }}>
                        {r.card.name}
                      </Typography>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={2} sx={{ marginBottom: "5px" }}>
                    <Typography sx={{ fontWeight: 600, textAlign: "right" }}>
                      {r.qty}
                    </Typography>
                  </Grid>
                </>
              );
            })}
          </Grid>
        </Box>
        {this.props.rowsPerPage ? (
          <TablePagination
            rowsPerPageOptions={[this.props.rowsPerPage]}
            rowsPerPage={this.props.rowsPerPage}
            onPageChange={this.handlePageChange}
            page={this.state.page}
            component="div"
            count={rows.length}
          />
        ) : (
          <></>
        )}
      </Paper>
    );
  }
}
