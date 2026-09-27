import { photoSet, type PhotoName } from '@/data/photos';

type Props = {
  name: PhotoName;
  /** Empty string for decorative photos. */
  alt?: string;
  sizes?: string;
  className?: string;
  /** Above-the-fold hero photos load eagerly with high fetch priority. */
  priority?: boolean;
};

export default function Photo({ name, alt = '', sizes = '100vw', className, priority = false }: Props) {
  const { src, srcSet, width, height } = photoSet(name);
  // React 18 does not know fetchPriority as a prop yet, so pass the lowercase DOM attribute.
  const priorityAttrs = priority ? ({ fetchpriority: 'high' } as Record<string, string>) : {};
  return (
    <img
      className={className}
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      width={width}
      height={height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      {...priorityAttrs}
    />
  );
}
