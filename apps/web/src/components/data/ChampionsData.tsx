import * as React from "react";
import { DataProps, DataState } from "./TournamentDataProps";
import _ from "lodash";
import { Lineup } from "@lor-analytics/data-extractor/tournament";
import { Deck } from "@lor-analytics/deck-utils/deck";
import GridBar from "../bars/GridBar";
import { Box, Grid, Paper, TablePagination } from "@mui/material";
import { PagedTableHeader } from "../PagedTable";
import ChampionIcon from "../icons/ChampionIcon";
import { cardFromCodeLocale } from "@lor-analytics/deck-utils/card";
import { CardBGCard } from "../CardBGCard";

export default class ChampionsData extends React.Component<
  DataProps,
  DataState
> {
  ref = React.createRef<typeof Paper>();
  constructor(props: DataProps) {
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
    const data = this.props.tournament.lineups
      .map((l: Lineup) => l.map((d: Deck) => d.champions))
      .flat(2);

    const count = Object.entries(
      _.groupBy(data, (d) => {
        return d.name;
      })
    ).map((e) => {
      const [key, group] = e;
      return {
        key: key,
        champion: group[0],
        qtd: group.length,
        percent: (group.length / data.length) * 100,
      };
    });

    const maxPercent = Math.max(...count.map((c) => c.percent));

    const rows = _.sortBy(count, (r) => r.qtd).reverse();
    const pageRows =
      this.props.paginated && this.props.rowsPerPage
        ? rows.slice(
            this.props.rowsPerPage * this.state.page,
            this.props.rowsPerPage * this.state.page + this.props.rowsPerPage
          )
        : rows;
    const csvData = rows.map((r) => {
      return [r.key, String(r.qtd)];
    });
    return (
      <Paper component={Box} elevation={0}>
        <PagedTableHeader
          title={this.props.locale.champions}
          pageLink={
            this.props.showFullScreenButton
              ? `/csv/${this.props.pageID}/champions`
              : undefined
          }
          csvData={csvData}
          csvFilename={`${this.props.locale.archetype}_${this.props.tournament.title}.csv`}
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
                  textValue={r.qtd}
                >
                  <ChampionIcon
                    championCard={cardFromCodeLocale(
                      r.champion.cardCode,
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
