import { Card } from "@lor-analytics/deck-utils/card";
import { Paper } from "@mui/material";
import { CSSProperties } from "@mui/styles";
import Image from "next/image";
import React, { ReactNode, Component } from "react";

type CardBGCardProps = {
  card: Card | null;
  children?: ReactNode;
  minHeight?: string;
};

const CardBGCard: React.FC<CardBGCardProps> = ({
  card,
  children,
  minHeight,
}) => {
  let css: CSSProperties = {
    objectPosition: "top center",
  };
  if (card?.type === "Spell" || card?.type === "Equipment") {
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
        minHeight: minHeight || "168px",
        position: "relative",
        textShadow: "1px 1px #000",
        cursor: "pointer",
        color: "rgb(255, 255, 255)",
        borderRadius: "5px",
        overflow: "hidden",
      }}
    >
      {children}
      {card && (
        <>
          <Image
            src={card.assets[0].fullAbsolutePath}
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
              background: "linear-gradient(180deg,transparent,rgba(0,0,1,.8))",
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
};

export { CardBGCard };
