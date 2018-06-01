cd  ~
cd weather-bot
git checkout master
git branch -D pr
git fetch origin "pull/$1/head"
git checkout -b pr FETCH_HEAD
rm -rf ~/tmp
cp -rfv ~/weather-bot ~/tmp
rm -rf ~/tmp/.git
cp -rfv ~/tmp/* ~/test-weather-bot-tw
cd ~/test-weather-bot-tw
git add -A
git commit -am "make it better"
git push heroku master