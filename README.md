npm run build
Remove-Item -Recurse -Force .\static
cp -r build/* .
git add .
git commit -m "Update"
git push origin gh-pages

npm start