var res = {
  // backgrouns ------
  AppBg: "res/bg.png",
  SplashBg: "res/splash.png",
  LoginBg: "res/login.png",
  GameOverBg: "res/game_over_bg.png",

  // elements for ui -    
  TopBarImg: "res/top_bar.png",
  BottomBarImg: "res/bottom_bar.png",

  ButtonNormal_png: "res/button_normal.png",
  ButtonSelected_png: "res/button_selected.png",
  MenuItem_png: "res/menu_item.png",

  InputNormalImg: "res/input.png",
  InputSelectedImg: "res/input_select.png",

  // login layer ---
  StampImg: "res/approved-stamp.png",

  CellImg: "res/cell.png",
  CellOpenImg: "res/cell_open.png",
  MarkErrorImg: "res/error_mark.png",
  MineImg: "res/mine.png",
  MineMarkImg: "res/flag.png",
  MineFireImg: "res/fire.png",

  // game ui button -
  ReplayImg: "res/replay.png",
  ExitImg: "res/exit.png",
  PauseImg: "res/pause.png",
  MenuImg: "res/menu.png",

  // toggle button --
  SoundOnImg: "res/sound_on.png",
  SoundOffImg: "res/sound_off.png",
  MusicOnImg: "res/music_on.png",
  MusicOffImg: "res/music_off.png",
  // sound ----------
  ClickSound: "sound/click3.wav",
  Music: "sound/music.mp3",
  Band: "sound/band.mp3"


};

var g_resources = [];
for (var i in res) {
  g_resources.push(res[i]);
}
