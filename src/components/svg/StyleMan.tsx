import * as React from 'react';

interface StyleManProps extends React.SVGProps<SVGSVGElement> {
  colors: string[];
}

function StyleMan(props: StyleManProps) {
  return (
    <svg
      width={111}
      height={159}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#prefix__filter0_d_2_118)">
        <mask
          id="prefix__a"
          maskUnits="userSpaceOnUse"
          x={4.612}
          y={0}
          width={102}
          height={65}
          fill="#000"
        >
          <path fill="#fff" d="M4.612 0h102v65h-102z" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M56.111 5.345c5.523 0 10-1.945 10-4.345h2.222a9.994 9.994 0 018.492 4.716c.491.501.936 1.061 1.325 1.677L105.5 50.708l-10.154 6.173-17.012-26.944V64H32.778V29.83L15.766 56.773 5.612 50.599l27.35-43.316c.44-.696.952-1.321 1.522-1.871A9.99 9.99 0 0142.778 1h3.333c0 2.4 4.477 4.345 10 4.345z"
          />
        </mask>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M56.111 5.345c5.523 0 10-1.945 10-4.345h2.222a9.994 9.994 0 018.492 4.716c.491.501.936 1.061 1.325 1.677L105.5 50.708l-10.154 6.173-17.012-26.944V64H32.778V29.83L15.766 56.773 5.612 50.599l27.35-43.316c.44-.696.952-1.321 1.522-1.871A9.99 9.99 0 0142.778 1h3.333c0 2.4 4.477 4.345 10 4.345z"
          fill={props.colors[0]}
        />
        <path
          d="M66.111 1V.5h-.5V1h.5zm10.714 4.716l-.425.264.03.047.037.039.358-.35zm1.325 1.677l.423-.267-.423.267zM105.5 50.708l.259.427.435-.264-.272-.43-.422.267zm-10.154 6.173l-.423.267.263.416.42-.256-.26-.427zM78.333 29.937l.423-.266-.923-1.462v1.729h.5zm0 34.063v.5h.5V64h-.5zm-45.555 0h-.5v.5h.5V64zm0-34.17h.5v-1.728l-.923 1.461.423.267zM15.766 56.773l-.26.427.42.255.263-.416-.423-.267zM5.612 50.599l-.423-.266-.272.43.435.264.26-.428zm27.35-43.316l.423.267-.423-.267zm1.522-1.871l.347.36.038-.037.03-.044-.415-.28zM46.11 1h.5V.5h-.5V1zm19.5 0c0 .433-.2.886-.644 1.342-.446.459-1.117.895-1.984 1.272-1.733.753-4.162 1.23-6.872 1.23v1c2.813 0 5.384-.494 7.27-1.313.943-.41 1.737-.91 2.302-1.491.568-.583.928-1.273.928-2.04h-1zm2.722-.5h-2.222v1h2.222v-1zm8.916 4.951A10.493 10.493 0 0068.333.5v1A9.493 9.493 0 0176.4 5.98l.849-.529zm1.324 1.675a10.588 10.588 0 00-1.391-1.76l-.715.7c.467.476.89 1.008 1.26 1.594l.846-.534zm27.348 43.315L78.573 7.126l-.845.534 27.348 43.315.845-.534zm-10.316 6.867l10.153-6.173-.519-.854-10.154 6.173.52.854zM77.91 30.204l17.011 26.944.846-.534-17.012-26.943-.845.533zM78.833 64V29.937h-1V64h1zm-46.055.5h45.555v-1H32.778v1zm-.5-34.67V64h1V29.83h-1zm-16.09 27.21l17.013-26.943-.846-.534-17.012 26.942.846.534zM5.353 51.026L15.506 57.2l.52-.855L5.87 50.172l-.52.855zm27.187-44.01L5.19 50.332l.845.533L33.385 7.55l-.846-.534zm1.597-1.965a10.588 10.588 0 00-1.597 1.964l.846.534a9.586 9.586 0 011.446-1.779l-.695-.719zM42.778.5a10.49 10.49 0 00-8.709 4.632l.83.56A9.49 9.49 0 0142.777 1.5v-1zm3.333 0h-3.333v1h3.333v-1zm10 4.345c-2.71 0-5.139-.478-6.872-1.231-.867-.377-1.537-.813-1.984-1.272-.444-.456-.644-.909-.644-1.342h-1c0 .767.36 1.457.928 2.04.565.581 1.36 1.081 2.302 1.49 1.886.82 4.457 1.315 7.27 1.315v-1z"
          fill="#000"
          mask="url(#prefix__a)"
        />
        <mask
          id="prefix__b"
          maskUnits="userSpaceOnUse"
          x={45.111}
          y={1}
          width={22}
          height={64}
          fill="#000"
        >
          <path fill="#fff" d="M45.111 1h22v64h-22z" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M56.111 5.395c5.52 0 9.997-1.966 10-4.392V64h-20V1c0 2.427 4.477 4.395 10 4.395z"
          />
        </mask>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M56.111 5.395c5.52 0 9.997-1.966 10-4.392V64h-20V1c0 2.427 4.477 4.395 10 4.395z"
          fill="#fff"
        />
        <path
          d="M66.111 1.003h.5-1 .5zm0 62.997v.5h.5V64h-.5zm-20 0h-.5v.5h.5V64zm19.5-62.998c0 .442-.203.902-.648 1.364-.447.464-1.117.904-1.984 1.285-1.732.761-4.16 1.244-6.868 1.244v1c2.813 0 5.384-.5 7.27-1.328.943-.414 1.737-.92 2.303-1.507.568-.59.926-1.286.927-2.057h-1zm0 0V64h1V1.003h-1zm.5 62.498h-20v1h20v-1zm-19.5.5V1h-1v63h1zm9.5-59.105c-2.709 0-5.137-.483-6.87-1.245-.867-.38-1.537-.822-1.984-1.286-.444-.462-.646-.922-.646-1.364h-1c0 .771.358 1.468.926 2.058.565.587 1.36 1.093 2.302 1.508 1.887.829 4.458 1.33 7.272 1.33v-1z"
          fill="#000"
          mask="url(#prefix__b)"
        />
      </g>
      <g filter="url(#prefix__filter1_d_2_118)">
        <mask
          id="prefix__c"
          maskUnits="userSpaceOnUse"
          x={33}
          y={68}
          width={45}
          height={83}
          fill="#000"
        >
          <path fill="#fff" d="M33 68h45v83H33z" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M61.581 121.937L59.37 86.646H51.63l-2.212 35.291H34V69h43v52.937H61.581zm2.978 28.168l-2.948-28.168H77v28.168H64.559zm-18.118 0l2.948-28.168H34v28.168h12.441z"
          />
        </mask>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M61.581 121.937L59.37 86.646H51.63l-2.212 35.291H34V69h43v52.937H61.581zm2.978 28.168l-2.948-28.168H77v28.168H64.559zm-18.118 0l2.948-28.168H34v28.168h12.441z"
          fill={props.colors[1]}
        />
        <path
          d="M59.369 86.646l.499-.032-.03-.468h-.47v.5zm2.212 35.291l-.499.031.03.469h.47v-.5zm-9.95-35.291v-.5h-.47l-.029.468.5.032zm-2.212 35.291v.5h.47l.029-.469-.5-.031zm-15.419 0h-.5v.5h.5v-.5zM34 69v-.5h-.5v.5h.5zm43 0h.5v-.5H77v.5zm0 52.937v.5h.5v-.5H77zm-15.389 0v-.5h-.555l.058.552.497-.052zm2.948 28.168l-.497.052.047.448h.45v-.5zM77 121.937h.5v-.5H77v.5zm0 28.168v.5h.5v-.5H77zm-27.611-28.168l.497.052.058-.552h-.555v.5zm-2.948 28.168v.5h.45l.047-.448-.497-.052zM34 121.937v-.5h-.5v.5h.5zm0 28.168h-.5v.5h.5v-.5zm24.87-63.428l2.212 35.291.998-.062-2.212-35.292-.998.063zm.499-.531H51.63v1h7.738v-1zm-9.451 35.822l2.212-35.291-.998-.063-2.212 35.292.998.062zm-.5-.531H34v1h15.419v-1zm-14.918.5V69h-1v52.937h1zM34 69.5h15.429v-1H34v1zm15.429 0h.011v-1h-.011v1zm.011 0h3.297v-1H49.44v1zm3.297 0v-1 1zm0 0h5.526v-1h-5.526v1zm5.526 0v-1 1zm0 0h3.297v-1h-3.297v1zm3.297 0h.011v-1h-.011v1zm.011 0H77v-1H61.571v1zM76.5 69v52.937h1V69h-1zm.5 52.437H61.581v1H77v-1zm-15.886.552l2.948 28.168.994-.104-2.947-28.168-.995.104zM77 121.437H61.611v1H77v-1zm.5 28.668v-28.168h-1v28.168h1zm-12.941.5H77v-1H64.559v1zm-15.668-28.72l-2.947 28.168.994.104 2.948-28.168-.995-.104zM34 122.437h15.389v-1H34v1zm.5 27.668v-28.168h-1v28.168h1zm11.941-.5H34v1h12.441v-1z"
          fill="#000"
          mask="url(#prefix__c)"
        />
      </g>
      <defs>
        <filter
          id="prefix__filter0_d_2_118"
          x={0.917}
          y={0.5}
          width={109.276}
          height={72}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_2_118" />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_2_118"
            result="shape"
          />
        </filter>
        <filter
          id="prefix__filter1_d_2_118"
          x={29.5}
          y={68.5}
          width={52}
          height={90.105}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_2_118" />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_2_118"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default StyleMan;
