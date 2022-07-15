import { Skeleton } from "@mui/material";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Tournament } from "@lor-analytics/data-extractor/tournament";
import { useRouter } from "next/router";
import locales from "@/locales";
import loadTournamentFromID from "@/lib/load_tournament";
import ArchetypesData from "@/components/data/ArchetypeData";
import TournamentTitle from "@/components/TournamentTitle";

const Archetype: NextPage = () => {
  const [tournament, setTournament] = useState<Tournament>();
  const router = useRouter();
  const locale = locales[router.locale || "en-US"];
  const query = router.query;
  useEffect(() => {
    if (!tournament && query.csv) {
      const tournamentID: string = query.csv as string;
      const filename = query.filename as string;
      loadTournamentFromID(tournamentID, filename).then(
        (tournament: Tournament) => {
          setTournament(tournament);
        }
      );
    }
  });
  return (
    <>
      {tournament ? (
        <>
          <TournamentTitle tournament={tournament} />
          <ArchetypesData
            locale={locale}
            pageID={`${query.csv}`}
            tournament={tournament}
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

export default Archetype;
