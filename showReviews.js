const listProducts = document.querySelector(".reviews");

document.addEventListener("DOMContentLoaded", () => {
    for (let i = 0; i < localStorage.length; i++) {
        const product = localStorage.key(i);
        const reviewSet = JSON.parse(localStorage.getItem(product));

        if (!Array.isArray(reviewSet)) continue; // Проверка на корректность данных

        const divProduct = createProductBlock(product, reviewSet);
        listProducts.appendChild(divProduct);
    }
});

function createProductBlock(product, reviewSet) {
    const divProduct = document.createElement("div");
    divProduct.innerHTML = `<h2>${product} <button class="mdc-button mdc-button--raised" onclick="toggleReviews(this)">Показать отзывы</button></h2>`;

    const divReviews = document.createElement("div");
    divReviews.hidden = true;
    divProduct.appendChild(divReviews);

    reviewSet.forEach((review) => {
        divReviews.appendChild(createReviewBlock(review, reviewSet, product));
    });

    return divProduct;
}

function createReviewBlock(reviewText, reviewSet, product) {
    const reviewBlock = document.createElement("div");
    const reviewSpan = document.createElement("span");
    reviewSpan.textContent = reviewText;

    reviewBlock.appendChild(reviewSpan);
    reviewBlock.appendChild(createDeleteButton(reviewSpan, reviewSet, product));

    return reviewBlock;
}

function createDeleteButton(reviewSpan, reviewSet, product) {
    const delBtn = document.createElement("button");
    delBtn.classList.add("mdc-button", "mdc-button--raised", "del-review");
    delBtn.textContent = "Удалить";

    delBtn.addEventListener("click", () => {
        const index = reviewSet.indexOf(reviewSpan.textContent);
        if (index > -1) {
            reviewSet.splice(index, 1);
            if (reviewSet.length > 0) {
                localStorage.setItem(product, JSON.stringify(reviewSet));
            } else {
                localStorage.removeItem(product);
                delBtn.closest("div").parentElement.remove();
            }
        }
        reviewSpan.parentElement.remove();
    });

    return delBtn;
}

function toggleReviews(button) {
    const reviewBlock = button.closest("div").querySelector("div");
    reviewBlock.hidden = !reviewBlock.hidden;
    button.textContent = reviewBlock.hidden ? "Показать отзывы" : "Скрыть отзывы";
}
