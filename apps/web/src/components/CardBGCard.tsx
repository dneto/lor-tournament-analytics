import { Card } from "@lor-analytics/deck-utils/card";
import { Paper } from "@mui/material";
import Image from "next/image";
import { ReactNode, Component } from "react";

type CardBGCardProps = {
  card: Card | null;
  children?: ReactNode;
  minHeight?: string;
  objectPosition?: string;
};

export class CardBGCard extends Component<CardBGCardProps> {
  render(): ReactNode {
    return (
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          minHeight: this.props.minHeight || "168px",
          position: "relative",
          textShadow: "1px 1px #000",
          cursor: "pointer",
          color: "rgb(255, 255, 255)",
          borderRadius: "5px",
        }}
      >
        {this.props.children}
        {this.props.card && (
          <>
            <Image
              src={this.props.card.assets[0].fullAbsolutePath}
              layout="fill"
              objectFit="cover"
              objectPosition={this.props.objectPosition || "top center"}
              style={{
                zIndex: 1,
                position: "absolute",
                top: 0,
                borderRadius: "5px",
              }}
            />
            <div
              style={{
                position: "absolute",
                background:
                  "linear-gradient(180deg,transparent,rgba(0,0,1,.8))",
                width: "100%",
                height: "100%",
                zIndex: "10",
                borderRadius: "5px",
              }}
            />
          </>
        )}
      </Paper>
    );
  }
}
