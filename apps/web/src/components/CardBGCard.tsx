import { Card } from "@lor-analytics/deck-utils/card";
import { Scale } from "@mui/icons-material";
import { Paper } from "@mui/material";
import { CSSProperties } from "@mui/styles";
import Image from "next/future/image";
import { ReactNode, Component } from "react";

type CardBGCardProps = {
  card: Card | null;
  children?: ReactNode;
  minHeight?: string;
  objectPosition?: string;
};

export class CardBGCard extends Component<CardBGCardProps> {
  render(): ReactNode {
    let css: CSSProperties = {
      objectPosition: "top center",
    };
    if (this.props.card?.type === "Spell") {
      css = {
        transform: "scale(1.15)",
        objectPosition: "50% 50%",
      };
    }
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
          overflow: "hidden",
        }}
      >
        {this.props.children}
        {this.props.card && (
          <>
            <Image
              src={this.props.card.assets[0].fullAbsolutePath}
              alt=""
              style={{
                zIndex: 1,
                position: "absolute",
                top: 0,
                borderRadius: "5px",
                objectFit: "cover",
                ...css,
              }}
              priority={true}
              sizes="(max-width: 360px) 100vw"
              fill
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
