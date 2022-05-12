const fileString = `%FDF-1.2
    %âãÏÓ
    1 0 obj
    <</FDF<</F(../104.1_A.pdf)/Fields[<</T(SkapareEfternamn)/V(Lund skapare)>><</T(SkapareEnhet)/V(ENhet skapre)>><</T(SkapareFornamn)/V(ROn skpare)>><</T(SkapareMyndighet)/V(Polismyndigheten)>><</T(SkapareTitel)/V(MR mr skapare test)>><</T(efternamn1)/V(ron ron test fdf)>><</T(personnummer1)/V(199109081811)>><</T(samtligaFornamn1)/V(anders anders fdf test)>><</T(tilltalsnamn1)/V(roooon)>>]/ID[<21DCA0DF0641054DB40FEA35A0892DF9><75302813E08A564C8A1C65F4A80BB19E>]/UF(../104.1_A.pdf)>>/Type/Catalog>>
    endobj
    trailer
    <</Root 1 0 R>>
    %%EOF
    `;

const http = require("http");
const PORT = process.env.PORT || 8080;

const server = http.createServer(async (req, res) => {
  if (req.url === "/api" && req.method === "GET") {
    const fileData = Buffer.from(fileString).toString("base64");
    const fileName = "test.fdf";
    const fileType = "text/vnd.fdf";

    res.writeHead(200, {
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Content-Type": fileType,
    });

    const download = Buffer.from(fileData, "base64");
    res.end(download);
  } else {
    res.writeHead(404, { "Content-Type": "application/vnd.fdf" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
