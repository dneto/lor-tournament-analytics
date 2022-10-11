import { ITournament } from "../../../../packages/db/src/models/tournament";

export default async function loadTournamentFromID(
  tournamentID: string
): Promise<ITournament> {
  const resp = await fetch(`/api/csv/${tournamentID}`, {
    method: "GET",
  });
  return await resp.json();
}
