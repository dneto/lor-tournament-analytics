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

export default class CardsData extends React.Component<DataProps, DataState> {
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
    const dataGroup = this.props.tournament.lineups
      .map((lineup) => lineup.map((deck) => deck.cardEntries))
      .reduce((prev: Record<string, number>, curr) => {
        curr.forEach((ces) =>
          ces.forEach((ce) => {
            prev[ce.card.cardCode] =
              prev[ce.card.cardCode] + ce.count || ce.count;
          })
        );
        return prev;
      }, {});

    const count = Object.entries(dataGroup).map((e) => {
      const [card, count] = e;

      return {
        key: card,
        card: cardFromCodeLocale(card, this.props.locale.locale),
        qtd: count,
      };
    });

    const rows = _.sortBy(count, (c) => c.qtd).reverse();
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
          title={this.props.locale.cards}
          pageLink={
            this.props.showFullScreenButton
              ? `/csv/${this.props.pageID}/cards`
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
                          width="250px"
                          height="376px"
                        />
                      }
                    >
                      <Typography variant="h6">{r.card.name}</Typography>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={2} sx={{ marginBottom: "5px" }}>
                    <Typography variant="h6">{r.qtd}</Typography>
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
