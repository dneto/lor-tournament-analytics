import * as React from "react";
import Image from "next/image";
import { Card } from "@lor-tournament-analytics/lor-decks-data";
import { style } from "@mui/system";
type ChampionIconProps = {
  championCard: Card;
  style?: React.CSSProperties;
};

class ChampionIcon extends React.Component<ChampionIconProps> {
  render() {
    return (
      <div
        style={Object.assign(
          {
            position: "relative",
            width: 26,
            height: 26,
            float: "left",
          },
          this.props.style
        )}
      >
        <Image
          key={this.props.championCard.cardCode}
          alt=""
          src={`/assets/imgs/champions/cropped/${this.props.championCard.cardCode}-cropped.png`}
          layout="fill"
          objectFit="contain"
          className="champion-icon"
          style={this.props.style}
          priority
        />
      </div>
    );
  }
}

export default ChampionIcon;
