<script>
  const canvas = document.getElementById('posterCanvas');
  const ctx = canvas.getContext('2d');
  const width = 800, height = 800;
  canvas.width = width;
  canvas.height = height;

  const bgUrl = 'https://i.ibb.co/6cLKGJVh/gold-7444104-1280.png';
  const logoUrl = 'https://i.ibb.co/mFJ7RVks/jakhira-design-logo.png';

  const bgImage = new Image();
  const logoImage = new Image();
  bgImage.crossOrigin = logoImage.crossOrigin = "anonymous";
  bgImage.src = bgUrl;
  logoImage.src = logoUrl;

  let allQuotes = [];

  function openPosterPopup() {
    allQuotes = Array.from(document.querySelectorAll('.poster-quote')).map(el => el.innerHTML);
    const tabsContainer = document.getElementById('quoteTabs');
    tabsContainer.innerHTML = '';

allQuotes.forEach(function(quoteHTML, i) {
  const tabBtn = document.createElement('button');
  tabBtn.textContent = `Line ${i + 1}`;
  tabBtn.style = "padding:6px 12px; background:#f0f0f0; border:none; border-radius:5px; cursor:pointer; font-family:'Sahitya';";
  tabBtn.onclick = function () {
    makePoster(quoteHTML);
  };
  tabsContainer.appendChild(tabBtn);
});

    document.getElementById('posterModal').style.display = 'flex';
  }

  function closePosterPopup() {
    document.getElementById('posterModal').style.display = 'none';
    document.getElementById('posterPreview').innerHTML = '';
  }

  function makePoster(rawText) {
    const lines = rawText.replace(/<br\s*\/?>/gi, '\n').split('\n');

    if (bgImage.complete && logoImage.complete) {
      drawPoster(lines);
    } else {
      bgImage.onload = () => logoImage.complete && drawPoster(lines);
      logoImage.onload = () => bgImage.complete && drawPoster(lines);
    }
  }

  function drawPoster(lines) {
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(bgImage, 0, 0, width, height);

    ctx.font = 'bold 42px Sahitya';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const lineHeight = 60;
    const totalHeight = lines.length * lineHeight;
    const startY = (height / 2) - (totalHeight / 2);
    lines.forEach((line, i) => {
      ctx.fillText(line.trim(), width / 2, startY + i * lineHeight);
    });

    // Author below quote
    const authorText = document.getElementById('posterAuthor')?.textContent || '';
    if (authorText.trim()) {
      ctx.font = 'bold 26px Sahitya';
      ctx.fillText(authorText.trim(), width / 2, startY + lines.length * lineHeight + 30);
    }

    // Watermark
    ctx.font = 'bold 24px Sahitya';
    ctx.fillText('www.Jakhira.com', width / 2, height - 30);

    // Logo
    ctx.drawImage(logoImage, width - 100, height - 100, 80, 80);

    // Show preview
    const imgData = canvas.toDataURL("image/png");
    document.getElementById('posterPreview').innerHTML = `
      <img src="${imgData}" width="400" height="400" style="border-radius:12px;border:1px solid #aaa;box-shadow:0 0 8px rgba(0,0,0,0.1);margin-bottom:10px;"/>
      <br/>
      <a href="${imgData}" download="poster.png" style="padding:10px 16px;background:#000;color:#fff;text-decoration:none;border-radius:6px;">⬇ पोस्टर डाउनलोड करें</a>
    `;
  }
</script>