# SM64 IGT to Real Time Converter

This web tool helps SM64 individuals easily convert their single star times from in-game time (IGT) to real time. You can view a live version [here](https://sm64-real-time.appspot.com/).

Real time is calculated using the following formula:
```
real_time = (in_game_time * 60 + buf_at_end - buf_at_start + num_fadeouts * 4 + num_ttm_slide_entries * 148) / (60000 / 1001)
```

> Why is real-time is greater even without any lag?
> 
SM64 in-game time is tracked at 60 frames per second, while the actual output is at 59.94 seconds. This means even without lag, the in-game timer is still slightly different than real time.

For more information on SM64 speedruns and links to the community Discord server, etc., check out the [Useful Resources document](https://docs.google.com/document/d/1kgjJXD4z_1Q_zzsTE_HcZJfWGBimrxY11iZn2Hi3-qY/preview).

## Usage
You can serve the project locally via [Angular CLI](https://cli.angular.io/):
```
ng serve
```

You can also deploy to your favorite Google Cloud project with the [Google Cloud SDK](https://cloud.google.com/sdk/):
```
ng build
gcloud app deploy
```
