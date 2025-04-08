Props와 State를 각각 3개 이상 사용하는 웹 페이지 만들기.

24년 말부터 준비해 온 프로젝트를 이용하면 설명하기 좋을 것 같습니다.
https://github.com/jay020420/Upload_Solution

해당 프로젝트는 온라인 쇼핑몰 (이커머스)를 운영하는 자영업자를 대상으로 제작되었습니다.

기본적으로는 텍스트 에디터를 이용해 편집된 내용 (텍스트 또는 이미지)를
각 오픈마켓의 api를 이용하여 동시에 업로드하는 기능이 중심인 프로젝트입니다.

추후 DB를 완벽히 정립한 후 재고 관리 및 송장 등록 기능을 최우선 업데이트 기능으로 두고 있있습니다.
그 외에 해외구매대행 판매자를 위하여 자체 api를 설계 및 구현하여
이용자가 직접 제작한 크롤러와 연동을 시켜 상품의 이미지, 가격, 정보 등을
간편하게 등록할 수 있도록 업데이트 할 예정입니다.

개인에게 api 엑세스를 내어주지 않는 오픈마켓의 문제가 있어 현재 완벽하게 동작하지는 않습니다만
Prop과 State의 관계를 이해하기 위해 좋은 예시라고 생각되어
가장 prop과 state를 많이 사용한 대표적인 파일 1개를 업로드하였습니다.

ProductForms.js

``// props 사용: product, isEdit, history
const ProductForm = ({ product, isEdit = false, history }) => {
  // state 사용
  const [fileList, setFileList] = useState([]);
  const [description, setDescription] = useState('');
  const [hasVariants, setHasVariants] = useState(false);
  const [options, setOptions] = useState([{ name: '', values: [{ name: '', additionalPrice: 0 }] }]);
  const [variants, setVariants] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  // 중략
}``
