import * as React from "react";
import { DataProps, DataState } from "./TournamentDataProps";
import _ from "lodash";
import GridBar from "../bars/GridBar";
import { Box, Grid, Paper, TablePagination } from "@mui/material";
import { PagedTableHeader } from "../PagedTable";
import ChampionIcon from "../icons/ChampionIcon";
import { cardFromCodeLocale } from "@lor-analytics/deck-utils/card";

type dataprops = DataProps & {
  data: {
    championCode: string;
    qty: number;
    percent: number;
  }[];
};

export default class ChampionsData extends React.Component<
  dataprops,
  DataState
> {
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
    const count = this.props.data.map((d) => ({
      ...d,
      key: d.championCode,
    }));
    const maxPercent = Math.max(...count.map((c) => c.percent));

    const rows = _.sortBy(count, (r) => r.qty).reverse();
    const pageRows =
      this.props.paginated && this.props.rowsPerPage
        ? rows.slice(
            this.props.rowsPerPage * this.state.page,
            this.props.rowsPerPage * this.state.page + this.props.rowsPerPage
          )
        : rows;
    const csvData = rows.map((r) => {
      return [r.key, String(r.qty)];
    });
    return (
      <Paper component={Box} elevation={0}>
        <PagedTableHeader
          title={this.props.locale.champions}
          pageLink={
            this.props.showFullScreenButton
              ? `/tournament/${this.props.pageID}/champions`
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
                <GridBar
                  key={r.key}
                  value={r.percent}
                  max={maxPercent}
                  textValue={r.qty}
                >
                  <ChampionIcon
                    championCard={cardFromCodeLocale(
                      r.championCode,
                      this.props.locale.locale
                    )}
                  />
                </GridBar>
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
