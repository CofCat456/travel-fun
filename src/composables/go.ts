import { useRouter } from 'vue-router';

export function useGo() {
  const router = useRouter();

  const goProduct = (id: string) => {
    const { href } = router.resolve({
      name: 'Product',
      params: {
        productId: id,
      },
    });

    window.open(href, '_blank');
  };

  return {
    goProduct,
  };
}
