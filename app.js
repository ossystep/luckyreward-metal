$(document).ready(function () {
    let nameCounts = {};

    // Add Name to List
    $('#addNameBtn').on('click', function () {
        const name = $('#name').val().trim();
        if (name !== "") {
            // Increase the count of the name or initialize it
            if (nameCounts[name]) {
                nameCounts[name] += 1;
            } else {
                nameCounts[name] = 1;
            }

            // Update the list to show names and their count
            updateNameList();

            $('#name').val(''); // Clear input after adding
        } else {
            alert("Please enter a name.");
        }
    });

    // Update the name list with counts, ordered by the most frequent
    function updateNameList() {
        // Clear and update the name list in the UI
        $('#nameList').empty();

        // Sort names by count in descending order
        const sortedNames = Object.keys(nameCounts).sort(function (a, b) {
            return nameCounts[b] - nameCounts[a];
        });

        // Append each name with its count to the list
        sortedNames.forEach(function (name) {
            $('#nameList').append(`<li>${name} (x${nameCounts[name]})</li>`);
        });
    }

    // Get Lucky Reward
    $('#getRewardBtn').on('click', function () {
        const rewardCount = parseInt($('#rewardCount').val());
        let participants = [];

        if (Object.keys(nameCounts).length === 0) {
            alert("No participants added!");
            return;
        }

        // Populate participants array with names according to their chance (count)
        Object.keys(nameCounts).forEach(function (name) {
            for (let i = 0; i < nameCounts[name]; i++) {
                participants.push(name);
            }
        });

        if (rewardCount > Object.keys(nameCounts).length) {
            alert("The number of rewards cannot exceed the number of unique participants.");
            return;
        }

        // Shuffle participants and select unique random winners
        const shuffledList = participants.sort(() => Math.random() - 0.5);
        const uniqueWinners = new Set();
        let winners = [];

        // Keep picking names from the shuffled list until we have enough unique winners
        for (let i = 0; i < shuffledList.length && winners.length < rewardCount; i++) {
            if (!uniqueWinners.has(shuffledList[i])) {
                uniqueWinners.add(shuffledList[i]);
                winners.push(shuffledList[i]);
            }
        }

        // Display winners
        $('#winnersList').empty(); // Clear previous results
        winners.forEach(function (winner) {
            $('#winnersList').append(`<li>${winner}</li>`);
        });
    });
});
