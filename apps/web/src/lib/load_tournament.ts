import { Tournament } from "@lor-analytics/data-extractor/tournament";
import LZString from "lz-string";

export default async function loadTournamentFromID(
  tournamentID: string,
  filename: string | null
): Promise<Tournament> {
  const resp = await fetch(`/api/csv/${tournamentID}`, { method: "GET" });
  const json = await resp.json();
  const csv = LZString.decompressFromEncodedURIComponent(json.data);
  if (csv == null) {
    throw "Tournament not found";
  }
  const blob = new Blob([csv], { type: "text/csv" });
  const name = (filename as string) || "tournament.csv";
  const tournament = await loadTournament(
    new File([blob], name, { type: "text/csv" })
  );
  tournament.title = json.title;
  tournament.logoURL = json.logoURL;
  return tournament;
}

async function loadTournament(csvFile: File): Promise<Tournament> {
  return new Promise<Tournament>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      if (result != null) {
        const tournament = Tournament.fromCSV(result.toString());
        resolve(tournament);
      }
      reject();
    };
    reader.readAsText(csvFile);
  });
}
