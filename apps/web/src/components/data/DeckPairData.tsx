import * as React from "react";
import { DataProps, DataState } from "./TournamentDataProps";
import _ from "lodash";
import { Archetype, Lineup } from "@lor-analytics/data-extractor/tournament";
import { Deck } from "@lor-analytics/deck-utils/deck";
import GridBar from "../bars/GridBar";
import { Box, Grid, Paper, TablePagination } from "@mui/material";
import { PagedTableHeader } from "../PagedTable";
import RegionIcon from "../icons/RegionIcon";
import ChampionIcon from "../icons/ChampionIcon";
import { cardFromCodeLocale } from "@lor-analytics/deck-utils/card";
import { Region, regionFromShortName } from "@lor-analytics/deck-utils/region";

const imgStyle: React.CSSProperties = {
  marginLeft: "2px",
  marginRight: "2px",
};

type dataprops = DataProps & {
  data: {
    decks: Archetype[];
    qty: number;
    percent: number;
  }[];
};

export default class DeckPairData extends React.Component<
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
    const count = this.props.data.map((e) => ({
      ...e,
      key: e.decks
        .map(
          (d) =>
            `${d.championsCode
              .map((c) => cardFromCodeLocale(c, this.props.locale.locale).name)
              .sort()
              .join("/")} [${d.regions.join("/")}]`
        )
        .join(";"),
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
          title={this.props.locale.deckpair}
          pageLink={
            this.props.showFullScreenButton
              ? `/tournament/${this.props.pageID}/lineups`
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
                  <Box sx={{ width: "100%" }}>
                    {r.decks.map((deck: Archetype) => (
                      <>
                        <Box
                          component="div"
                          sx={{
                            height: "24px",
                            marginRight: "30px",
                            display: "inline-block",
                          }}
                        >
                          {deck.championsCode.map((c) => (
                            <ChampionIcon
                              championCard={cardFromCodeLocale(
                                c,
                                this.props.locale.locale
                              )}
                              style={{ ...imgStyle }}
                            />
                          ))}
                          {deck.regions.map((r) => (
                            <RegionIcon
                              region={regionFromShortName(r) as Region}
                              style={{ ...imgStyle }}
                            />
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
