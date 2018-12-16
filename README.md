# SM64 IGT to Real Time Converter

This web tool helps SM64 individuals easily convert their single star times from in-game time (IGT) to real time. Real time is calculated using the following formula:
```
real_time = (in_game_time * 60 + buf_at_end - buf_at_start + num_fadeouts * 4 + (num_ttm_slide_entries * 128)) / (60000 / 1001)
```
For more information on SM64 speedruns and links to the community Discord server, etc., check out the [Useful Resources document](https://docs.google.com/document/d/1kgjJXD4z_1Q_zzsTE_HcZJfWGBimrxY11iZn2Hi3-qY/preview).

## Usage
You can serve the project locally via [Angular CLI](https://cli.angular.io/).
```
ng serve
```

You can also deploy to your favorite Google Cloud project with the Google Cloud SDK:
```
# TODO(brikr): Setup GAE stuff
ng build
gcloud app deploy
```
