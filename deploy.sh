ionic build --prod
gsutil cp -r www/* gs://oshou.xiaca.org
gsutil acl ch -r -u AllUsers:R gs://oshou.xiaca.org
gsutil web set -m index.html gs://oshou.xiaca.org

