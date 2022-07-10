const comentList2 = document.querySelector('.teaContent');

comentList2.addEventListener('click', async (e) => {
  console.log('Click');
  if (e.target.id === 'btnDeleteComment') {
    const closestLi = e.target.closest('li');
    const commentId = closestLi.dataset.commentid;

    const response = await fetch(`/lk/comment/${commentId}`, {
      method: 'delete',
      headers: { 'Content-type': 'application/json' },
    });

    if (response.ok) {
      closestLi.remove();
    } else {
      console.log('Response delete error');
    }
  }
});