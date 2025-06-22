document.addEventListener('DOMContentLoaded', function() {
  const items = document.querySelectorAll('.item');
  const previewArea = document.getElementById('preview-area');
  
  // Configuración de prendas
  const clothingConfig = {
    abrigo: {
      class: 'preview-abrigo',
      img: 'abrigolego.png'
    },
    chaqueta: {
      class: 'preview-chaqueta',
      img: 'chaqueta.png'
    },
    pantalon: {
      class: 'preview-pantalon',
      img: 'pantalonrm.png'
    }
  };

  // Manejar clic en prendas
  items.forEach(item => {
    item.addEventListener('click', function() {
      const itemType = this.getAttribute('data-item');
      const isSelected = this.classList.contains('selected');

      if (isSelected) {
        // Remover prenda
        this.classList.remove('selected');
        const previewItem = previewArea.querySelector(`.${clothingConfig[itemType].class}`);
        if (previewItem) previewItem.remove();
      } else {
        // Añadir prenda
        this.classList.add('selected');
        // Lógica especial para chaqueta y abrigo
        if (itemType === 'abrigo') {
          // Quitar chaqueta si está puesta
          const chaquetaItem = document.querySelector('.item[data-item="chaqueta"]');
          if (chaquetaItem && chaquetaItem.classList.contains('selected')) {
            chaquetaItem.classList.remove('selected');
            const chaquetaPreview = previewArea.querySelector('.preview-chaqueta');
            if (chaquetaPreview) chaquetaPreview.remove();
          }
        } else if (itemType === 'chaqueta') {
          // Quitar abrigo si está puesto
          const abrigoItem = document.querySelector('.item[data-item="abrigo"]');
          if (abrigoItem && abrigoItem.classList.contains('selected')) {
            abrigoItem.classList.remove('selected');
            const abrigoPreview = previewArea.querySelector('.preview-abrigo');
            if (abrigoPreview) abrigoPreview.remove();
          }
        }
        if (!previewArea.querySelector(`.${clothingConfig[itemType].class}`)) {
          const img = document.createElement('img');
          img.src = clothingConfig[itemType].img;
          img.alt = itemType;
          img.classList.add('preview-item', clothingConfig[itemType].class);
          previewArea.appendChild(img);
        }
      }
    });
  });

  // Animación para que el LEGO siga el scroll de la página
  window.addEventListener('scroll', function() {
    const container = document.getElementById('lego-persona-container');
    if (container) {
      // Calcula la posición deseada (puedes ajustar el factor para suavidad)
      const offset = Math.max(80, 20 + window.scrollY * 0.2);
      container.style.top = offset + 'px';
    }
  });
});
