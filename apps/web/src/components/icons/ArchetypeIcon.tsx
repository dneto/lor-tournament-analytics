import * as React from "react";
import ChampionIcon from "./ChampionIcon";
import RegionIcon from "./RegionIcon";
import { Box } from "@mui/material";
import { Archetype } from "@lor-analytics/data-extractor/tournament";
import { cardFromCode } from "@lor-analytics/deck-utils/card";
import { Region, regionFromShortName } from "@lor-analytics/deck-utils/region";
type ArchetypeIconProps = {
  archetype: Archetype;
};

const imgStyle: React.CSSProperties = {
  marginLeft: "2px",
  marginRight: "2px",
};

class ArchetypeIcon extends React.Component<ArchetypeIconProps> {
  render() {
    return (
      <Box>
        {this.props.archetype.championsCode.map((c) => (
          <ChampionIcon
            key={`${c}`}
            championCard={cardFromCode(c)}
            style={{ ...imgStyle }}
          />
        ))}
        {this.props.archetype.regions.map((reg: string) => (
          <RegionIcon
            region={regionFromShortName(reg) as Region}
            style={{ ...imgStyle }}
          />
        ))}
      </Box>
    );
  }
}

export default ArchetypeIcon;
