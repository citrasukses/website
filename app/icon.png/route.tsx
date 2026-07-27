import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

const iconSize = {
  width: 512,
  height: 512
};

export const dynamic = "force-static";

export async function GET() {
  const logo = await readFile(join(process.cwd(), "public/assets/company/cse_logo.png"));
  const logoDataUrl = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#ffffff",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: "52px",
          width: "100%"
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          height="160"
          src={logoDataUrl}
          style={{
            height: "160px",
            width: "396px"
          }}
          width="396"
        />
      </div>
    ),
    iconSize
  );
}
