import * as React from "react";
import Image from "next/image";
import { Card } from "@lor-analytics/deck-utils";
import { Tooltip } from "@mui/material";
type ChampionIconProps = {
  championCard: Card;
  style?: React.CSSProperties;
};

class ChampionIcon extends React.Component<ChampionIconProps> {
  render() {
    return (
      <div
        style={{
          position: "relative",
          width: 24,
          height: 24,
          float: "left",
          display: "block",

          ...this.props.style,
        }}
      >
        <Tooltip title={this.props.championCard.name}>
          <Image
            key={this.props.championCard.cardCode}
            alt={this.props.championCard.name}
            src={`/assets/imgs/champions/cropped/${this.props.championCard.cardCode}-cropped.png`}
            layout="fill"
            objectFit="contain"
            className="champion-icon"
            style={this.props.style}
            priority
          />
        </Tooltip>
      </div>
    );
  }
}

export default ChampionIcon;
