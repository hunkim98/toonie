import * as React from "react";
import { SVGProps } from "react";

//https://www.svgrepo.com/
//https://react-svgr.com/playground/?typescript=true

export const PanningIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={"100%"}
    height={"100%"}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 36 36"
    enableBackground={"new 0 0 36 36"}
    xmlSpace="preserve"
    {...props}
  >
    <title>{"cursor-hand-line"}</title>
    <path
      className="clr-i-outline clr-i-outline-path-1"
      d="M30.74 15.19a13.66 13.66 0 0 0-6.87-3.83 26 26 0 0 0-5.87-.78v-5.3A3.4 3.4 0 0 0 14.5 2 3.4 3.4 0 0 0 11 5.28v10L9.4 13.7a3.77 3.77 0 0 0-5.28 0A3.67 3.67 0 0 0 3 16.33a3.6 3.6 0 0 0 1 2.56l4.66 5.52a11.53 11.53 0 0 0 1.43 4 10.12 10.12 0 0 0 2 2.54v1.92a1.07 1.07 0 0 0 1 1.08H27a1.07 1.07 0 0 0 1-1.08v-2.7a12.81 12.81 0 0 0 3-8.36v-6a1 1 0 0 0-.26-.62ZM29 21.86a10.72 10.72 0 0 1-2.6 7.26 1.11 1.11 0 0 0-.4.72V32H14.14v-1.48a1 1 0 0 0-.44-.83 7.26 7.26 0 0 1-1.82-2.23 9.14 9.14 0 0 1-1.2-3.52 1 1 0 0 0-.23-.59l-4.92-5.82a1.7 1.7 0 0 1 0-2.42 1.76 1.76 0 0 1 2.47 0l3 3v3.14l2-1V5.28A1.42 1.42 0 0 1 14.5 4 1.42 1.42 0 0 1 16 5.28v11.8l2 .43v-4.92a24.27 24.27 0 0 1 2.51.18V18l1.6.35V13c.41.08.83.17 1.26.28a14.88 14.88 0 0 1 1.53.49v5.15l1.6.35V14.5a11.06 11.06 0 0 1 2.5 1.73Z"
    />
    <path fill="none" d="M0 0h36v36H0z" />
  </svg>
);

export const EraserIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={"100%"}
    height={"100%"}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 297 297"
    enableBackground={"new 0 0 297 297"}
    xmlSpace="preserve"
    {...props}
  >
    <path d="M287.55 260.218H149.47l131.846-131.846c10.437-10.437 10.437-27.419 0-37.856l-64.808-64.808c-10.437-10.437-27.419-10.436-37.856 0L11.788 192.573c-5.055 5.056-7.84 11.778-7.84 18.928s2.785 13.872 7.84 18.928l29.79 29.79H9.45a9.45 9.45 0 0 0 0 18.9h278.1c5.218 0 9.45-4.231 9.45-9.45 0-5.219-4.231-9.451-9.45-9.451zM192.016 39.072c3.069-3.069 8.063-3.067 11.128 0l64.808 64.808a7.814 7.814 0 0 1 2.305 5.565 7.82 7.82 0 0 1-2.305 5.564L159.309 223.651l-75.936-75.936L192.016 39.072zm-69.274 221.147H68.306l-43.154-43.155c-3.068-3.067-3.068-8.06 0-11.127l44.858-44.858 75.936 75.936-23.204 23.204z" />
  </svg>
);

export const PngIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    enableBackground="new 0 0 48 48"
    xmlSpace="preserve"
    {...props}
  >
    <path d="M47.987 21.938a.99.99 0 0 0-.053-.264c-.011-.032-.019-.063-.033-.094a.957.957 0 0 0-.193-.285l-.001-.001L42 15.586V10c0-.022-.011-.041-.013-.063a1.028 1.028 0 0 0-.051-.257c-.011-.032-.019-.063-.034-.094a.997.997 0 0 0-.196-.293l-9-9a.97.97 0 0 0-.294-.196c-.03-.014-.06-.022-.091-.032a.937.937 0 0 0-.263-.052C32.039.01 32.021 0 32 0H7a1 1 0 0 0-1 1v14.586L.293 21.293l-.002.002a.98.98 0 0 0-.192.285c-.014.031-.022.062-.033.094a.953.953 0 0 0-.053.264C.011 21.96 0 21.978 0 22v19a1 1 0 0 0 1 1h5v5a1 1 0 0 0 1 1h34a1 1 0 0 0 1-1v-5h5a1 1 0 0 0 1-1V22c0-.022-.011-.04-.013-.062zM44.586 21H42v-2.586L44.586 21zm-6-12H33V3.414L38.586 9zM8 2h23v8a1 1 0 0 0 1 1h8v10H8V2zM6 18.414V21H3.414L6 18.414zM40 46H8v-4h32v4zm6-6H2V23h44v17z" />
    <path d="M33.588 32.934h1.462v3.111a1.613 1.613 0 0 1-.535.246 2.692 2.692 0 0 1-.739.094c-.431 0-.802-.113-1.113-.34-.312-.227-.569-.541-.774-.944a5.278 5.278 0 0 1-.459-1.411 9.257 9.257 0 0 1-.153-1.725c0-.589.051-1.15.153-1.683s.255-1 .459-1.403c.204-.402.462-.722.774-.96a1.756 1.756 0 0 1 1.097-.357c.771 0 1.383.329 1.836.986l1.173-1.428a3.335 3.335 0 0 0-1.275-1.08c-.521-.255-1.139-.382-1.853-.382-.68 0-1.292.156-1.836.467a4.25 4.25 0 0 0-1.394 1.309c-.385.562-.68 1.227-.884 1.998a9.885 9.885 0 0 0-.306 2.533c0 .941.105 1.796.315 2.567s.51 1.434.901 1.989.87.983 1.437 1.283c.567.301 1.207.451 1.921.451.703 0 1.306-.091 1.811-.272a4.384 4.384 0 0 0 1.3-.714v-6.103h-3.315c-.003 0-.003 1.768-.003 1.768zM16.987 26.72a2.82 2.82 0 0 0-1.097-.586 4.453 4.453 0 0 0-1.19-.17h-3.332V38h2.006v-4.828h1.428c.419 0 .827-.074 1.224-.221a2.9 2.9 0 0 0 1.054-.68c.306-.306.552-.688.74-1.148.187-.459.281-.994.281-1.606 0-.68-.105-1.247-.315-1.7s-.476-.819-.799-1.097zm-1.283 4.284c-.306.335-.697.502-1.173.502h-1.156v-3.825h1.156c.476 0 .867.147 1.173.442.306.295.459.765.459 1.411s-.153 1.136-.459 1.47zM25.547 34.515h-.051l-3.383-8.551h-2.329V38h1.836l-.034-8.5h.051l3.417 8.5h2.244V25.964H25.53z" />
  </svg>
);

export const RectangleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={"100%"}
    height={"100%"}
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby="rectangleIconTitle"
    viewBox="0 0 24 24"
    enableBackground="new 0 0 24 24"
    xmlSpace="preserve"
    stroke="#000"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
    color="#000"
    {...props}
  >
    <title>{"Rectangle"}</title>
    <path d="M3 3h18v18H3z" />
  </svg>
);

export const PenIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={"100%"}
    height={"100%"}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 449.213 449.213"
    enableBackground="new 0 0 449.213 449.213"
    xmlSpace="preserve"
    {...props}
  >
    <path d="m415.035 142.109 21.016-21.016c8.487-8.487 13.162-19.772 13.162-31.775s-4.675-23.288-13.162-31.775L391.66 13.15c-17.521-17.519-46.028-17.521-63.551 0L47.611 293.649a15 15 0 0 0-3.627 5.873L.767 429.469a14.999 14.999 0 0 0 18.966 18.967l129.946-43.218a14.994 14.994 0 0 0 5.873-3.627l238.269-238.269 3.153 3.153c9.56 9.559 14.131 22.741 12.543 36.167-1.589 13.426-9.11 25.178-20.638 32.243l-71.469 43.804c-29.461 18.056-47.874 49.449-49.256 83.976-.331 8.277 6.11 15.256 14.389 15.587.204.008.407.013.61.013 8.007 0 14.654-6.328 14.978-14.401a73.207 73.207 0 0 1 34.956-59.597l71.47-43.804c19.41-11.897 32.077-31.688 34.752-54.296 2.675-22.608-5.023-44.807-21.122-60.905l-3.152-3.153zM349.322 34.364c5.824-5.825 15.301-5.824 21.125 0l44.392 44.393c2.821 2.821 4.375 6.572 4.375 10.562s-1.554 7.741-4.375 10.563l-35.865 35.865-65.516-65.517 35.864-35.866zM66.55 326.731l55.921 55.921-83.786 27.866 27.865-83.787zm74.861 46.576-65.516-65.516L299.316 84.37l65.516 65.517-223.421 223.42z" />
  </svg>
);

export const MoreToolsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={"100%"}
    height={"100%"}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 210 210"
    enableBackground="new 0 0 210 210"
    xmlSpace="preserve"
    {...props}
  >
    <path d="M25 80C11.215 80 0 91.215 0 105s11.215 25 25 25 25-11.215 25-25-11.215-25-25-25zM105 80c-13.785 0-25 11.215-25 25s11.215 25 25 25 25-11.215 25-25-11.215-25-25-25zM185 80c-13.785 0-25 11.215-25 25s11.215 25 25 25 25-11.215 25-25-11.215-25-25-25z" />
  </svg>
);

export const ImageIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={"100%"}
    height={"100%"}
    viewBox="0 0 606.365 606.366"
    enableBackground="new 0 0 606.365 606.366"
    xmlSpace="preserve"
    {...props}
  >
    <path d="M547.727 144.345h-13.619v-13.618c0-32.059-26.08-58.14-58.139-58.14H58.64C26.581 72.587.5 98.669.5 130.727v273.155c0 32.058 26.082 58.14 58.14 58.14h13.618v13.618c0 32.059 26.082 58.14 58.14 58.14h417.327c32.059 0 58.141-26.081 58.141-58.14V202.485c-.001-32.059-26.081-58.14-58.139-58.14zm15.298 331.294c0 8.45-6.85 15.3-15.299 15.3H130.398c-8.45 0-15.3-6.85-15.3-15.3V202.485c0-8.451 6.85-15.3 15.3-15.3H547.727c8.449 0 15.299 6.85 15.299 15.3v273.154zM43.34 403.881V130.727c0-8.45 6.85-15.3 15.3-15.3h417.329c8.449 0 15.299 6.85 15.299 15.3v13.618h-360.87c-32.058 0-58.14 26.082-58.14 58.14v216.696H58.641c-8.451 0-15.301-6.85-15.301-15.3z" />
    <path d="M547.725 534.279H130.397c-32.334 0-58.64-26.306-58.64-58.64v-13.118H58.64c-32.334 0-58.64-26.306-58.64-58.64V130.727c0-32.334 26.306-58.64 58.64-58.64h417.329c32.333 0 58.639 26.306 58.639 58.64v13.118h13.119c32.333 0 58.639 26.306 58.639 58.64v273.154c-.001 32.334-26.306 58.64-58.641 58.64zM58.64 73.086C26.857 73.086 1 98.944 1 130.727v273.155c0 31.782 25.857 57.64 57.64 57.64h14.118v14.118c0 31.782 25.857 57.64 57.64 57.64h417.327c31.783 0 57.641-25.857 57.641-57.64V202.485c0-31.783-25.856-57.64-57.639-57.64h-14.119v-14.118c0-31.783-25.856-57.64-57.639-57.64H58.64zm489.087 418.353H130.398c-8.712 0-15.8-7.088-15.8-15.8V202.485c0-8.712 7.088-15.8 15.8-15.8h417.329c8.712 0 15.799 7.088 15.799 15.8v273.154c-.001 8.712-7.088 15.8-15.799 15.8zM130.398 187.685c-8.161 0-14.8 6.64-14.8 14.8v273.154c0 8.161 6.639 14.8 14.8 14.8h417.329c8.16 0 14.799-6.639 14.799-14.8V202.485c0-8.161-6.639-14.8-14.799-14.8H130.398zm-57.64 231.996H58.641c-8.712 0-15.801-7.088-15.801-15.8V130.727c0-8.712 7.088-15.8 15.8-15.8h417.329c8.712 0 15.799 7.088 15.799 15.8v14.118h-361.37c-31.783 0-57.64 25.857-57.64 57.64v217.196zM58.64 115.926c-8.161 0-14.8 6.639-14.8 14.8v273.155c0 8.16 6.64 14.8 14.801 14.8h13.118V202.485c0-32.334 26.306-58.64 58.64-58.64h360.37v-13.118c0-8.161-6.639-14.8-14.799-14.8H58.64z" />
    <path d="m502.035 427.5-14.096-14.097-68.252-68.252c-5.975-5.976-15.662-5.976-21.637 0l-38.783 38.782-72.451-72.451c-5.975-5.976-15.663-5.976-21.637 0L157.48 419.181l-8.32 8.319c-3.57 3.57-5.005 8.464-4.31 13.101a15.228 15.228 0 0 0 4.31 8.537l8.656 8.655a15.232 15.232 0 0 0 8.054 4.228c1.827.334 3.702.334 5.528 0a15.217 15.217 0 0 0 8.055-4.228l17.192-17.192 21.42-21.42 47.113-47.113c5.975-5.976 15.663-5.976 21.637 0l47.112 47.113 21.42 21.42 17.193 17.192a15.23 15.23 0 0 0 8.055 4.228c1.826.334 3.701.334 5.527 0a15.22 15.22 0 0 0 8.055-4.228l8.656-8.655a15.243 15.243 0 0 0 4.309-8.537c.695-4.637-.738-9.53-4.309-13.101l-8.32-8.319-4.953-4.954 19.307-19.309 24.264 24.263 21.42 21.42 17.191 17.192a15.232 15.232 0 0 0 7.57 4.129c3.635.787 7.498.239 10.811-1.646a15.314 15.314 0 0 0 3.258-2.482l8.654-8.655c5.611-5.61 5.953-14.493 1.029-20.503-.322-.391-.664-.77-1.029-1.136z" />
    <path d="M383.359 462.772c-.955 0-1.915-.088-2.854-.259a15.705 15.705 0 0 1-8.318-4.366l-85.726-85.726c-2.795-2.796-6.512-4.335-10.465-4.335s-7.67 1.539-10.465 4.335l-85.725 85.726a15.701 15.701 0 0 1-8.318 4.366c-1.877.342-3.83.342-5.708 0a15.705 15.705 0 0 1-8.318-4.366l-8.656-8.655a15.675 15.675 0 0 1-4.451-8.816c-.741-4.942.923-10 4.451-13.528L264.825 311.13c2.984-2.984 6.952-4.628 11.172-4.628s8.188 1.644 11.172 4.628l72.098 72.098 38.43-38.429c2.984-2.984 6.951-4.628 11.172-4.628s8.188 1.644 11.172 4.628l82.348 82.349c.364.364.722.758 1.062 1.17a15.739 15.739 0 0 1-1.062 21.175l-8.654 8.655a15.792 15.792 0 0 1-11.168 4.623h-.001c-1.128 0-2.258-.12-3.358-.359a15.734 15.734 0 0 1-7.818-4.264l-62.521-62.521-18.6 18.602 12.92 12.92a15.876 15.876 0 0 1 4.449 13.528 15.681 15.681 0 0 1-4.449 8.816l-8.656 8.655a15.705 15.705 0 0 1-8.318 4.366c-.941.17-1.901.258-2.856.258zm-107.362-95.686c4.22 0 8.188 1.644 11.172 4.628l85.726 85.726a14.707 14.707 0 0 0 7.791 4.089c1.758.322 3.59.322 5.348 0a14.707 14.707 0 0 0 7.791-4.089l8.656-8.655a14.696 14.696 0 0 0 4.168-8.258 14.874 14.874 0 0 0-4.168-12.673l-13.627-13.627 20.014-20.016 63.229 63.229a14.74 14.74 0 0 0 7.322 3.994c3.538.764 7.328.188 10.458-1.593a14.84 14.84 0 0 0 3.151-2.401l8.654-8.655a14.744 14.744 0 0 0 .996-19.833 15.728 15.728 0 0 0-.996-1.098l-82.348-82.349c-2.795-2.796-6.512-4.335-10.465-4.335s-7.67 1.539-10.465 4.335l-39.137 39.136-72.805-72.805c-2.795-2.796-6.512-4.335-10.465-4.335s-7.669 1.539-10.465 4.335L149.514 427.854a14.87 14.87 0 0 0-4.168 12.673 14.68 14.68 0 0 0 4.168 8.258l8.656 8.655a14.707 14.707 0 0 0 7.791 4.089c1.76.322 3.59.322 5.349 0a14.704 14.704 0 0 0 7.791-4.089l85.725-85.726a15.693 15.693 0 0 1 11.171-4.628zM491.268 213.967a58.727 58.727 0 0 0-21.523-4.063c-32.551 0-59.033 26.482-59.033 59.032 0 32.551 26.482 59.032 59.033 59.032 7.59 0 14.852-1.441 21.523-4.063a59.237 59.237 0 0 0 21.42-14.51c9.969-10.574 16.088-24.814 16.088-40.459 0-15.644-6.119-29.885-16.088-40.459a59.233 59.233 0 0 0-21.42-14.51zm-21.526 71.161c-8.941 0-16.191-7.25-16.191-16.192s7.25-16.191 16.191-16.191c8.943 0 16.193 7.25 16.193 16.191.001 8.942-7.249 16.192-16.193 16.192z" />
    <path d="M469.744 328.467c-32.827 0-59.533-26.706-59.533-59.532 0-32.826 26.706-59.532 59.533-59.532a59.11 59.11 0 0 1 21.706 4.098c8.114 3.188 15.584 8.248 21.602 14.632 10.462 11.098 16.224 25.588 16.224 40.802s-5.762 29.704-16.224 40.802c-6.016 6.383-13.485 11.442-21.602 14.633a59.114 59.114 0 0 1-21.706 4.097zm0-118.064c-32.275 0-58.533 26.257-58.533 58.532 0 32.275 26.258 58.532 58.533 58.532a58.091 58.091 0 0 0 21.341-4.029c7.979-3.136 15.323-8.11 21.238-14.387 10.287-10.912 15.952-25.158 15.952-40.116s-5.665-29.205-15.952-40.116c-5.916-6.277-13.261-11.252-21.238-14.387a58.116 58.116 0 0 0-21.341-4.029zm-.002 75.225c-9.204 0-16.691-7.488-16.691-16.692s7.487-16.691 16.691-16.691c9.205 0 16.693 7.488 16.693 16.691.001 9.204-7.488 16.692-16.693 16.692zm0-32.384c-8.652 0-15.691 7.039-15.691 15.691 0 8.653 7.039 15.692 15.691 15.692 8.653 0 15.693-7.04 15.693-15.692.001-8.652-7.039-15.691-15.693-15.691z" />
  </svg>
);

export const PlusIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 52 52"
    enableBackground="new 0 0 52 52"
    xmlSpace="preserve"
    {...props}
  >
    <path d="M26 0C11.664 0 0 11.663 0 26s11.664 26 26 26 26-11.663 26-26S40.336 0 26 0zm12.5 28H28v11a2 2 0 0 1-4 0V28H13.5a2 2 0 0 1 0-4H24V14a2 2 0 0 1 4 0v10h10.5a2 2 0 0 1 0 4z" />
  </svg>
);

export const PointerIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={"80%"}
    height={"80%"}
    viewBox="0 0 295.688 295.688"
    enableBackground="new 0 0 295.688 295.688"
    xmlSpace="preserve"
    {...props}
  >
    <path d="M291.294 239.713 189.603 138.024l74.055-31.949a15 15 0 0 0-1.393-28.066L19.554.707A15.001 15.001 0 0 0 .708 19.552l77.303 242.713a14.998 14.998 0 0 0 28.065 1.393l31.949-74.054 101.69 101.69a14.997 14.997 0 0 0 21.21 0l30.367-30.368c5.86-5.858 5.86-15.355.002-21.213z" />
  </svg>
);
