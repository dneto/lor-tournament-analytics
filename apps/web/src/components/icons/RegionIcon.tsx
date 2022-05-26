import * as React from "react";
import Image from "next/image";
import { Region } from "@lor-analytics/deck-utils";
import { Tooltip } from "@mui/material";
type ChampionIconProps = {
  region: Region;
  style?: React.CSSProperties;
};

class RegionIcon extends React.Component<ChampionIconProps> {
  render() {
    return (
      <div
        style={Object.assign(
          {
            position: "relative",
            width: 32,
            height: 32,
            float: "left",
          },
          this.props.style
        )}
      >
        <Tooltip title={this.props.region.ref}>
          <Image
            alt={this.props.region.ref}
            layout="fill"
            src={`/assets/imgs/regions/${this.props.region.code}.svg`}
          />
        </Tooltip>
      </div>
    );
  }
}

export default RegionIcon;
