declare namespace Kakao {
  // https://developers.kakao.com/sdk/reference/js/release/Kakao.Share.html#.sendDefault
  export interface DefaultFeedSettings {
    objectType: string;
    content: ContentObject;
    itemContent?: ItemContentObject;
    social?: SocialObject;
    buttonTitle?: string;
    buttons?: ButtonObject[];
    installTalk?: boolean;
    callback?: function;
    severCallabckArgs?: object | string;
  }

  export interface DefaultListSettings {
    objectType: string;
    headerTitle: string;
    headerLink: string;
    contents: ContentObject[];
    buttonTitle?: string;
    buttons?: ButtonObject[];
    installTalk?: boolean;
    callback?: function;
    severCallabckArgs?: object | string;
  }

  export interface DefaultLocationSettings {
    objectType: string;
    content: ContentObject;
    address: string;
    addressTitle?: string;
    social?: SocialObject;
    buttonTitle: string;
    buttons?: ButtonObject[];
    installTalk?: boolean;
    callback?: function;
    severCallabckArgs?: object | string;
  }

  export interface DefaultCommerceSettings {
    objectType: string;
    content: ContentObject;
    commerce: CommerceObject;
    buttonTitle?: string;
    buttons?: ButtonObject[];
    installTalk?: boolean;
    callback?: function;
    severCallabckArgs?: object | string;
  }

  export interface DefaultTextSettings {
    objectType: string;
    text: string;
    link: LinkObject;
    buttonTitle?: string;
    buttons?: ButtonObject[];
    installTalk?: boolean;
    callback?: function;
    severCallabckArgs?: object | string;
  }

  export interface DefaultCalendarSettings {
    objectType: string;
    idType: string;
    id: string;
    content: ContentObject;
    buttons?: ButtonObject[];
    installTalk?: boolean;
    callback?: function;
    severCallabckArgs?: object | string;
  }

  namespace Share {
    function sendDefault(
      settings:
        | DefaultFeedSettings
        | DefaultListSettings
        | DefaultLocationSettings
        | DefaultCommerceSettings
        | DefaultTextSettings
        | DefaultCalendarSettings
    ): void;
  }
}
