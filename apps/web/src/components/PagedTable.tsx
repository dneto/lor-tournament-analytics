import {
  BorderAllRounded as GridOnIcon,
  PhotoRounded as PhotoIcon,
  ZoomOutMapRounded as ZoomOutIcon,
  ArrowBackRounded as BackIcon,
} from "@mui/icons-material";
import { IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import * as React from "react";

import path from "path";
import { NextRouter, withRouter } from "next/router";
import { ILocale } from "@/locales";
import { Theme, withTheme } from "@material-ui/core";
interface ToolbarProps {
  pageLink?: string;
  showBackButton?: boolean;
  title: string;
  csvData: string[][];
  csvFilename: string;
  imgRef: React.RefObject<any>;
  router: NextRouter;
  locale: ILocale;
  theme: Theme;
}

const pagedTableHeader = withRouter(
  class extends React.Component<ToolbarProps> {
    blobURL: string;
    constructor(props: ToolbarProps) {
      super(props);
      this.blobURL = this.getBlobUrl();
    }

    getBlobUrl(): string {
      const data = this.props.csvData.map((r) => r.join(",")).join("\n");
      const blob = new Blob([data], { type: "text/csv" });
      return URL.createObjectURL(blob);
    }

    render() {
      if (this.props.pageLink) {
        this.props.router.prefetch(`${this.props.pageLink}`);
      }
      return (
        <>
          <Toolbar sx={{ paddingRight: 0 }}>
            {this.props.showBackButton && (
              <Tooltip title="Back">
                <IconButton
                  href="#"
                  onClick={() => {
                    this.props.router.back();
                  }}
                >
                  <BackIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            <Typography
              variant="h6"
              component="div"
              sx={{ flex: "1 1 100%", userSelect: "none" }}
            >
              {this.props.title}
            </Typography>
            <Tooltip title="Download as PNG">
              <IconButton
                onClick={() => {
                  import("react-component-export-image").then((r) =>
                    r.exportComponentAsPNG(this.props.imgRef, {
                      html2CanvasOptions: {
                        scale: 2,
                        scrollX: 0,
                        scrollY: -window.scrollY,
                      },
                      fileName: `${
                        path.parse(this.props.csvFilename).name
                      }.png`,
                    })
                  );
                }}
              >
                <PhotoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Download as CSV">
              <a
                rel="noreferrer"
                href={this.blobURL}
                target="_blank"
                download={this.props.csvFilename}
              >
                <IconButton>
                  <GridOnIcon fontSize="small" />
                </IconButton>
              </a>
            </Tooltip>
            {this.props.pageLink ? (
              <Tooltip title={this.props.locale.viewFullScreen}>
                <IconButton
                  href="#"
                  onClick={() => {
                    this.props.router.push(`${this.props.pageLink}`);
                  }}
                >
                  <ZoomOutIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            ) : (
              <></>
            )}
          </Toolbar>
        </>
      );
    }
  }
);

const PagedTableHeader = withTheme(pagedTableHeader);

export { PagedTableHeader };
