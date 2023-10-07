import * as S from './style';
import { FormattedMessage } from 'react-intl';
import { Tag } from '@Data/resultColorData';

interface TagContentProps {
  tags: Tag[];
  colorType: ColorType;
}

function Tag({ tags, colorType }: TagContentProps) {
  return (
    <S.TagWrapper>
      {tags.map(({ backgroundColor, textColor }, index: number) => (
        <S.Tag
          key={index}
          backgroundColor={backgroundColor}
          textColor={textColor}
        >
          <FormattedMessage id={`${colorType}.keyword.${index}`}>
            {(message) => <span>{`#${message}`}</span>}
          </FormattedMessage>
        </S.Tag>
      ))}
    </S.TagWrapper>
  );
}

export default Tag;
