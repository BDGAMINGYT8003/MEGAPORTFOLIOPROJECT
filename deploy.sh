#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run docs:build

# navigate into the build output directory
cd docs/.vuepress/dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'Deploy: site update to GitHub Pages'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:BDGAMINGYT8003/MEGAPORTFOLIOPROJECT.git main:gh-pages
# Or, if using a different default branch name like 'master' for the source, and 'gh-pages' for the built site:
# git push -f git@github.com:BDGAMINGYT8003/MEGAPORTFOLIOPROJECT.git master:gh-pages
# Assuming the source branch is 'main' and deploying to 'gh-pages' branch.

cd -
# Remove dist folder after push (optional)
# rm -rf docs/.vuepress/dist
