const imgContainer = document.querySelector("#imageGrid");
const authorSelector = document.getElementById("authorSelector");
const urlAPI = "https://picsum.photos/v2/list";

async function fetchImage(url) {
	const response = await fetch(url);
	const data = await response.json();

	return data;
}

function populateImages(imageData, imgContainer) {
	imageData.forEach((item, index, array) => {
		const imgTag = document.createElement("img");
		imgTag.src = item.download_url;

		imgContainer.appendChild(imgTag);
	});
}

function populateDropdown(imageData, authorSelector) {
	const uniqueAuthor = [];

	imageData.forEach((item) => {
		const author = item.author;

		if (!uniqueAuthor.includes(author)) {
			uniqueAuthor.push(author);
		}
	});

	const defaultOption = document.createElement("option");
	defaultOption.value = "";
	defaultOption.innerText = "Select an option!";
	authorSelector.appendChild(defaultOption);

	uniqueAuthor.forEach((item) => {
		const option = document.createElement("option");
		option.value = item;
		option.innerText = item;

		authorSelector.appendChild(option);
	});

	authorSelector.addEventListener("change", (event) => {
		const crAuthor = event.target.value;
		// Rest image container first before populating filtered images
		imgContainer.innerHTML = "";

		if (crAuthor) {
			const filteredImages = imageData.filter((item) => {
				return item.author === crAuthor;
			});

			populateImages(filteredImages, imgContainer);
		} else {
			populateImages(imageData, imgContainer);
		}
	});
}

// on page load fetch and populate the image data to DOM
document.addEventListener("DOMContentLoaded", async function () {
	const imageData = await fetchImage(urlAPI);

	populateImages(imageData, imgContainer);

	populateDropdown(imageData, authorSelector);
});
