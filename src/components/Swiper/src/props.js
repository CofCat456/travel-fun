export const basicProps = {
  slidesPerView: {
    type: Number,
    default: 6,
  },
  slidesPerGroup: {
    type: Number,
    default: 6,
  },
  spaceBetween: {
    type: Number,
    default: 24,
  },
  speed: {
    type: Number,
    default: 1200,
  },
  loop: Boolean,
  centeredSlides: Boolean,
  imagesUrl: {
    type: Array,
    default: () => [],
  },
  btn: {
    type: Object,
    default: () => ({
      text: '',
      pathName: '',
    }),
  },
};
