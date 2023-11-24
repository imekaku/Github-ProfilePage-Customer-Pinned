// ==UserScript==
// @name         Add Custom Repositories to GitHub Profile
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Add custom GitHub repositories to the profile page
// @author       imekaku
// @icon         https://github.githubassets.com/favicons/favicon.png
// @match        https://github.com/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    // Add YOUR NAME!
    var username = 'username';

    // Get the current page URL
    var currentPageUrl = window.location.href;

    // Check if the current URL contains the specified username
    if (!currentPageUrl.includes(`github.com/${username}`)) {
        // If it does not contain, do not execute the script
        return;
    }

    // Add YOUR REPOSITORIES!
    var repoNames = ['repository-name-01', 'repository-name-02'];

    repoNames.forEach(function(repoName) {
        var repoURL = `https://github.com/${username}/${repoName}`;

        GM_xmlhttpRequest({
            method: "GET",
            url: repoURL,
            onload: function(response) {
                var parser = new DOMParser();
                var doc = parser.parseFromString(response.responseText, "text/html");

                // Some repositories may not have description information
                var repoDescriptionElement = doc.querySelector("div.hide-sm.hide-md p.f4.my-3");
                var repoDescription = repoDescriptionElement ? repoDescriptionElement.textContent.trim() : '';

                var repoVisibility = doc.querySelector("span.Label.Label--secondary.v-align-middle.mr-1.d-none.d-md-block")?.textContent.trim() || 'Public';

                // Some repositories may not have language information
                var languageElement = doc.querySelector("div.BorderGrid-cell li.d-inline");
                var language, languageColor;
                if (languageElement) {
                    language = languageElement.querySelector("span.color-fg-default.text-bold")?.textContent.trim();
                    var color = languageElement.querySelector("svg.octicon-dot-fill")?.getAttribute("style");
                    var colorMatch = color ? color.match(/color:([^;]+)/) : null;
                    languageColor = colorMatch ? colorMatch[1].trim() : '';
                } else {
                    language = '';
                    languageColor = '';
                }

                // Add repository information to github profile page
                addRepoToProfile(repoName, repoDescription, repoURL, language, languageColor, repoVisibility);
            }
        });
    });

    function addRepoToProfile(repoName, repoDescription, repoURL, language, languageColor, repoVisibility) {
        var listItem = document.createElement("li");
        listItem.className = "mb-3 d-flex flex-content-stretch col-12 col-md-6 col-lg-6";

        var descriptionHTML = repoDescription ? `<p class="pinned-item-desc color-fg-muted text-small mt-2 mb-0">${repoDescription}</p>` : '';
        var languageHTML = language ? `
            <p class="mb-0 mt-2 f6 color-fg-muted">
                <span class="d-inline-block mr-3">
                    <span class="repo-language-color" style="background-color: ${languageColor}"></span>
                    <span itemprop="programmingLanguage">${language}</span>
                </span>
            </p>` : '';

        listItem.innerHTML = `
        <div class="Box d-flex p-3 width-full public source">
            <div class="pinned-item-list-item-content">
                <div class="d-flex width-full position-relative">
                    <div class="flex-1">
                        <span class="position-relative">
                            <a href="${repoURL}" class="Link mr-1 text-bold wb-break-word">
                                <span class="repo">${repoName}</span>
                            </a>
                        </span>
                        <span class="Label Label--secondary v-align-middle mt-1 no-wrap v-align-baseline Label--inline">${repoVisibility}</span>
                    </div>
                </div>
                ${descriptionHTML}
                ${languageHTML}
            </div>
        </div>`;

        // Get current ol list, and then add the new list
        var ol = document.querySelector(".js-pinned-items-reorder-list");
        if (ol) {
            ol.appendChild(listItem);
        }
    }

})();
