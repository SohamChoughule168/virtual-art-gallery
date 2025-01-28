let scene,
  camera,
  renderer,
  artworks,
  currentArtworkIndex = 0

const artworkData = [
  {
    title: "Starry Night",
    description:
      "Vincent van Gogh's masterpiece depicting a night sky filled with swirling clouds, stars, and a crescent moon.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
  },
  {
    title: "The Persistence of Memory",
    description: "Salvador Dalí's surrealist work featuring melting clocks in a desert landscape.",
    image: "https://uploads6.wikiart.org/images/salvador-dali/the-persistence-of-memory-1931.jpg!Large.jpg",
  },
  {
    title: "The Scream",
    description:
      "Edvard Munch's expressionist painting portraying an agonized figure against a landscape with a tumultuous orange sky.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg/1280px-Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg",
  },
  {
    title: "Girl with a Pearl Earring",
    description:
      "Johannes Vermeer's tronie, or character study, of a girl wearing an exotic dress, an oriental turban, and a large pearl earring.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/800px-1665_Girl_with_a_Pearl_Earring.jpg",
  },
  {
    title: "The Birth of Venus",
    description:
      "Sandro Botticelli's Renaissance masterpiece depicting the goddess Venus emerging from the sea as a fully grown woman.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/1280px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg",
  },
]

function init() {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("gallery-canvas") })
  renderer.setSize(window.innerWidth, window.innerHeight)

  const galleryGeometry = new THREE.BoxGeometry(20, 10, 20)
  const galleryMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.BackSide })
  const galleryMesh = new THREE.Mesh(galleryGeometry, galleryMaterial)
  scene.add(galleryMesh)

  artworks = []
  const artworkGeometry = new THREE.PlaneGeometry(5, 3)

  for (let i = 0; i < artworkData.length; i++) {
    const texture = new THREE.TextureLoader().load(artworkData[i].image)
    const material = new THREE.MeshBasicMaterial({ map: texture })
    const artwork = new THREE.Mesh(artworkGeometry, material)
    artwork.position.set(0, 0, -9.9 + i * 5)
    scene.add(artwork)
    artworks.push(artwork)
  }

  camera.position.z = 5

  animate()
  updateInfoPanel()
}

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

function updateInfoPanel() {
  const infoPanel = document.getElementById("info-panel")
  const titleElement = document.getElementById("artwork-title")
  const descriptionElement = document.getElementById("artwork-description")

  titleElement.textContent = artworkData[currentArtworkIndex].title
  descriptionElement.textContent = artworkData[currentArtworkIndex].description
  infoPanel.classList.remove("hidden")
}

document.getElementById("next-btn").addEventListener("click", () => {
  if (currentArtworkIndex < artworks.length - 1) {
    currentArtworkIndex++
    camera.position.z -= 5
    updateInfoPanel()
  }
})

document.getElementById("prev-btn").addEventListener("click", () => {
  if (currentArtworkIndex > 0) {
    currentArtworkIndex--
    camera.position.z += 5
    updateInfoPanel()
  }
})

document.getElementById("close-info").addEventListener("click", () => {
  document.getElementById("info-panel").classList.add("hidden")
})

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

init()

