## Github-ProfilePage-Customer-Pinned

When using GitHub, only Public Repositories can be displayed on the Profile page, and it's not possible to pin Private Repositories. Therefore, this script is added to customize the Repository list.

## Steps

1. This is a Tampermonkey script, so you need to install this extension in your browser (URL: https://www.tampermonkey.net)
2. Add this script to the Tampermonkey extension: click on the extension, then click `Create a new script`, and paste this script.
3. Modify the script with your username and the list of repositories you wish to display. The code in the script is as follows:

```
    // Add YOUR NAME!
    var username = 'username';

    // Add YOUR REPOSITORIES!
    var repoNames = ['repository-name-01', 'repository-name-02'];
```
