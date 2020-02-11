/*
* Find Combination of 2 words
* Author Sushant Rahate
*/
window.onload = function () {
    let word1 = document.getElementById('word1');
    let word2 = document.getElementById('word2');
    let loadingSpinner = document.getElementById('loadingSpinner');
    let showWords = document.getElementById('showWords');
    let showNames = document.getElementById('showNames');
    // ************************************************************
    // ** Find all possible word combinations of 2 words **
    // ************************************************************

    // 2nd function running inside 1st
    // Some recursive Magic funtion that genrate all combos of word
    tree = (leafs) => {
        let branches = [];
        if (leafs.length == 1) return leafs;
        for (let k in leafs) {
            let leaf = leafs[k];
            tree(leafs.join('').replace(leaf, '').split('')).concat("").map(subtree => {
                branches.push([leaf].concat(subtree));
            });
        }
        return branches;
    };

    // 1st function
    // Pass value to the recursive fution to get all combination
    allpossibleWordsbyWord = (val) => {
        return tree(val.split('')).map(function (str) {
            if (str) {
                return str.join('');
            }
        })
    }

    // 3rd function
    //Gives all combination of 2 words
    allComboListof2Words = (val1Array, val2Array) => {
        let allComboListArray = [];
        let sortArr = [];
        let sortByWordLenght = [];
        for (i = 0; i < val1Array.length; i++) {
            for (j = 0; j < val2Array.length; j++) {
                allComboListArray.push(val1Array[i] + val2Array[j]);
            }
        }
        sortArr = allComboListArray.sort();
        sortByWordLenght = sortArr.sort(function (a, b) {
            return a.length - b.length;
        });;
        return sortByWordLenght
    }

    // Filter out values bellow 3 character 
    filterBellow3Words = (valueArray) => {
        return valueArray.filter(value => (value.length > 2));
    }

    // 0th Funtion
    //get called by button 
    findAllCombo = () => {
        validWordLength();
        showWords.innerHTML = '';
        showNames.innerHTML = '';

        // 2. Find all Possible combination words by word 1
        let word1Array = allpossibleWordsbyWord(word1.value.toLowerCase());

        // 2. Find all Possible combination words by word 2
        let word2Array = allpossibleWordsbyWord(word2.value.toLowerCase());

        // 3. Limit array list to min 3 character for all word1 array
        let filter1array = filterBellow3Words(word1Array);
        // 3. Limit array list to min 3 character for all word2 array
        let filter2array = filterBellow3Words(word2Array);

        // 4. Find all combination of 2 words and assign to showWords div
        showWords.innerHTML = allComboListof2Words(filter1array, filter2array);
    }

    // ************************************************************
    // ** Find Name Combinations by 2 words **
    // ************************************************************

    allPossibleNamesbyWord = (word) => {
        let nameList = [];
        for (s = 2; s <= word.length; s++) {
            // console.log('================')
            for (i = 0, j = s; i <= word.length - 1 + s, j <= word.length - 1; j++ , i++) {
                // console.log(i, j + 1);
                // console.log(word.substring(i,j+1));
                nameList.push(word.substring(i, j + 1));
            }
        }
        return nameList;
    }

    // To find Couple Name Combo, get called by button
    CoupleNamesCombo = () => {
        validWordLength();
        showWords.innerHTML = '';
        showNames.innerHTML = '';

        let word1Array = allPossibleNamesbyWord(word1.value.toLowerCase());
        let word2Array = allPossibleNamesbyWord(word2.value.toLowerCase());

        let namesList1 = allComboListof2Words(word1Array, word2Array);
        let namesList2 = allComboListof2Words(word2Array, word1Array);
        var namesList = [...new Set([...namesList1, ...namesList2])];
        namesList.forEach((element, i) => {
            showNames.innerHTML += `<h6>${i + 1} ${element}</h6>`;
        });
    }

    // ************************************************************
    // ** Common Methods **
    // ************************************************************

    // validation for more than 2 char and intial hide showWords and show loadingSpinner
    validWordLength = () => {
        if (word1.value.length == '' || word2.value.length == '') {
            showWords.innerHTML = 'Input is blank.';
            exit;
        } else if (word1.value.length < 3 || word2.value.length < 3) {
            showWords.innerHTML = 'Word should have at least 3 character..';
            exit;
        } else {
            showWords.setAttribute("hidden", false);
            showNames.setAttribute("hidden", false);
            loadingSpinner.removeAttribute("hidden");
            someHalt();
        }
    }

    // Halt output for 4 sec and show spinner
    someHalt = () => {
        setTimeout(() => {
            loadingSpinner.setAttribute("hidden", false);
            showWords.removeAttribute("hidden");
            showNames.removeAttribute("hidden");
        }, 4000);
    }

    // Clear all data
    clearData = () => {
        showWords.innerHTML = '';
        showNames.innerHTML = '';
        word1.value = '';
        word2.value = '';
    }
}();  