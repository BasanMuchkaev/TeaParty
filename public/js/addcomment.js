const formcom = document.forms.addComents;

function createPartHTMLcomment(data, opinion) {
  return `
  <ul class="comments">
  <li class="comment">
    <div class="comment-header">
      <h6>${data.name}</h6>
      <img class="btnDeleteComment" src="/img/delete_2_line.svg" alt="delete comment">
    </div>
    <span class="description">${opinion}</span>
  </li>
</ul>
  `;
}

formcom?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const myform = Object.fromEntries(new FormData(formcom));
  const formid = document.querySelector('#teaid');
  const { id } = formid.dataset;
  const response = await fetch('http://localhost:3000/tea/:id', {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ myform, id }),
  });
  if (response.ok) {
    // const data = await response.json();
    // const opinion = document.querySelector('#opinion');
    // const container = document.querySelector('[data-containerCom]');
    // container.insertAdjacentHTML('afterbegin', createPartHTMLcomment(data, opinion));

    window.location.reload();
  } else {
    console.log('ERROR');
  }
});


