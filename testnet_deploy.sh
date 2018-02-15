ionic build --prod
gsutil cp -r www/* gs://testnet_oshou.xiaca.org
gsutil acl ch -r -u AllUsers:R gs://testnet_oshou.xiaca.org
gsutil web set -m index.html gs://testnet_oshou.xiaca.org

