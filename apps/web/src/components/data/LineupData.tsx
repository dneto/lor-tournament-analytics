import * as React from "react";
import { DataProps, DataState } from "./TournamentDataProps";
import _ from "lodash";
import { Lineup } from "@lor-analytics/data-extractor/tournament";
import { Deck } from "@lor-analytics/deck-utils/deck";
import GridBar from "../bars/GridBar";
import { Box, Grid, Paper, TablePagination } from "@mui/material";
import { PagedTableHeader } from "../PagedTable";
import RegionIcon from "../icons/RegionIcon";
import ChampionIcon from "../icons/ChampionIcon";
import { cardFromCodeLocale } from "@lor-analytics/deck-utils/card";

const imgStyle: React.CSSProperties = {
  marginLeft: "2px",
  marginRight: "2px",
};

export default class LineupData extends React.Component<DataProps, DataState> {
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
    const data: Lineup[] = this.props.tournament.lineups;
    const dataGroup = _.groupBy(data, (lineup) => {
      return lineup
        .map((d: Deck) => {
          const key = `${d.champions
            .map((c) => c.name)
            .sort()
            .join("/")}[${d.regions
            .map((r) => r.shortName)
            .sort()
            .join("/")}]`;
          return key;
        })
        .sort()
        .join(";");
    });

    const count = Object.entries(dataGroup).map((e) => {
      const [key, group] = e;

      return {
        key: key,
        lineup: group[0],
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
      <Paper component={Box}>
        <PagedTableHeader
          title={this.props.locale.lineups}
          pageLink={
            this.props.showFullScreenButton
              ? `/csv/${this.props.pageID}/lineups`
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
                  <Box sx={{ width: "100%" }}>
                    {r.lineup.map((deck: Deck) => (
                      <>
                        <Box
                          component="div"
                          sx={{
                            height: "42px",
                            marginRight: "30px",
                            display: "inline-block",
                            borderBottom: "5px solid rgba(0,0,0,0.08)",
                          }}
                        >
                          {deck.champions.map((c) => (
                            <ChampionIcon
                              championCard={cardFromCodeLocale(
                                c.cardCode,
                                this.props.locale.locale
                              )}
                              style={{ ...imgStyle }}
                            />
                          ))}
                          {deck.regions.map((r) => (
                            <RegionIcon region={r} style={{ ...imgStyle }} />
                          ))}
                        </Box>
                      </>
                    ))}
                  </Box>
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
