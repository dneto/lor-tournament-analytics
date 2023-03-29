import { Skeleton } from "@mui/material";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Tournament } from "@lor-analytics/data-extractor/tournament";
import { useRouter } from "next/router";
import locales from "@/locales";
import loadTournamentFromID from "@/lib/load_tournament";
import TournamentTitle from "@/components/TournamentTitle";
import DeckPairData from "@/components/data/DeckPairData";
import { ITournament } from "../../../../../../packages/db/src/models/tournament";

const DeckPair: NextPage = () => {
  const [tournament, setTournament] = useState<ITournament>();
  const router = useRouter();
  const locale = locales[router.locale || "en-US"];
  const query = router.query;
  useEffect(() => {
    if (!tournament && router.isReady && query.csv) {
      const tournamentID: string = query.csv as string;
      loadTournamentFromID(tournamentID).then((tournament: ITournament) => {
        setTournament(tournament);
      });
    }
  });
  return (
    <>
      {tournament ? (
        <>
          <TournamentTitle tournament={tournament} />
          <DeckPairData
            locale={locale}
            pageID={`${query.csv}`}
            title={tournament.title}
            data={tournament.deckpair}
            showBackButton
          />
        </>
      ) : (
        <>
          <Skeleton variant="rectangular" width="100%" height="400px" />
        </>
      )}
    </>
  );
};

export default DeckPair;
