function validateInput() {
  const input_field = document.querySelector("#name_input");
  const comment_field = document.querySelector("#comment_input");
  const submit_btn = document.querySelector("#submit_btn");

  if (
    input_field.value.trim().length === 0 ||
    comment_field.value.trim().length === 0
  ) {
    submit_btn.disabled = true;
    submit_btn.classList.add("disabled");
    return;
  }

  submit_btn.disabled = false;
  submit_btn.classList.remove("disabled");
}

let comments = [];

function render_comments(sort_order = "asc") {
  const comment_list = document.querySelector("#comment-list");
  comment_list.innerHTML = "";

  const sorted_comments = comments.slice().sort((a, b) => {
    const date_a = new Date(a.date);
    const date_b = new Date(b.date);
    return sort_order === "asc" ? date_a - date_b : date_b - date_a;
  });

  sorted_comments.forEach((comment) => {
    const comment_element = document.createElement("div");
    comment_element.classList.add("comment");
    comment_element.innerHTML = `
      <h4>${comment.name}</h4>
      <p>${comment.text}</p>
      <small>${comment.date.toLocaleString()}</small>`;
    comment_list.appendChild(comment_element);
  });
}

document.querySelector("#comment_form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name_input = document.querySelector("#name_input");
  const comment_input = document.querySelector("#comment_input");

  if (!name_input.value.trim() || !comment_input.value.trim()) {
    return;
  }

  const new_comment = {
    name: name_input.value,
    text: comment_input.value,
    date: new Date(),
  };

  comments.push(new_comment);

  name_input.value = "";
  comment_input.value = "";

  render_comments(document.querySelector("#sort_order").value);
});

document.querySelector("#sort_order").addEventListener("change", () => {
  render_comments(document.querySelector("#sort_order").value);
});

render_comments();