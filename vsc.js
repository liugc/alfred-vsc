const { exec } = require("child_process");
const path = require("path");

exec(
  `sqlite3 '/Users/anker/Library/Application\ Support/Code/User/globalStorage/state.vscdb' "select value from ItemTable where key = 'history.recentlyOpenedPathsList'"`,
  (err, stdout) => {
    if (err) throw err;
    let items = JSON.parse(stdout).entries;
    items = items.map((item) => {
      const isFoler = !!item.folderUri
      const subtitle = isFoler ? item.folderUri : item.fileUri;
      const icon = isFoler ? "folder.png" : "file.png";
      return {
        title: path.basename(subtitle),
        subtitle,
        arg: subtitle.replace("file://", ""),
        icon: {
          path: path.join(__dirname, icon)
        },
      };
    });
    if (process.argv.length > 2) {
      items = items.filter((item) => {
        return (
          item.title.toLowerCase().indexOf(process.argv[2].toLowerCase()) > -1
        );
      });
    }
    console.log(JSON.stringify({ items }));
  }
);
