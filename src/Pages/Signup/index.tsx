import Input from "../../components/Input";
import { useForm } from "react-hook-form";
import { Form, InputWrapper, SubmitWrapper } from "./style";
import * as S from "./style";
import { useState } from "react";

export default function SignUp() {
  const [showVerification, setShowVerification] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<{ phoneNumber: string; verificationCode: string }>({ mode: "onChange" });

  const onSubmit = (data: { phoneNumber: string; verificationCode: string }) => {
    if (!showVerification) {
      console.log("전화번호가 제출되었습니다", data.phoneNumber);
      setShowVerification(true); // 인증번호 input 보이기
    } else {
      if (data.verificationCode !== "123456") {
        setError("verificationCode", {
          type: "manual",
          message: "인증번호가 올바르지 않습니다",
        });
      } else {
        console.log("인증번호가 제출되었습니다", data.verificationCode);
      }
    }
  };
  const handleButtonClick = () => {
    if (showVerification) {
      // 이전으로
      setShowVerification(false);
    } else {
      // 넘어가기
      console.log("넘어가기");
    }
  };

  return (
    <S.Layout>
      <S.Wrapper>
        <S.Logo>
          <svg width="218" height="130" viewBox="0 0 218 130" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M72.0205 16.8624L32.3786 0.367126L0.984375 129.403L64.3049 98.8066L45.8143 65.6831L33.0437 70.8711L35.8373 79.7839L27.1906 89.6278L40.8923 24.0458L44.351 29.1008L35.8373 55.041L51.5344 64.4858L72.0205 16.8624ZM64.9701 42.0044L51.2684 68.7427L55.2592 75.7931L62.5756 72.3344L58.5848 84.0407L64.3049 91.8893L68.5618 70.0729L68.2957 63.5546L58.5848 67.4124L57.7867 64.6189L67.4976 56.6373L64.9701 42.0044ZM68.5618 31.4953L74.947 15.9312L82.2635 42.4035L81.0663 22.8486L96.6303 29.6329L95.8322 93.7516L84.658 111.045L81.0663 63.5546V102.132L72.6856 93.7516L68.5618 31.4953ZM118.314 6.61936L98.6257 30.165V102.398L122.57 119.825L119.245 78.1875H113.525H108.47V38.9448L112.061 36.2842L109.667 62.6235L119.245 56.6373L118.314 6.61936ZM139.332 29.4999L122.038 12.3395L124.433 117.829L139.332 98.4076V29.4999ZM135.075 44.7979L128.291 38.6787L131.882 95.747L133.612 92.8204L135.075 44.7979ZM169.928 2.09647L143.855 28.3027L143.189 100.137L198.262 78.9857L191.212 55.7061L176.047 60.495L181.235 67.6785L163.276 75.1279L166.336 34.821L173.919 31.7613L180.703 43.3346L176.712 48.3896L192.01 51.5823L196.134 38.9448L169.928 2.09647ZM183.763 87.3664L159.02 97.4764V108.917L195.469 128.338L204.116 122.618L203.317 103.463L183.763 87.3664ZM177.111 97.0773L170.194 98.4076L171.258 105.192L176.446 102.398L177.111 97.0773ZM195.85 106.817L197.337 113.702L190.678 115.381L191.215 109.514L195.85 106.817ZM184.561 111.976V106.655L187.487 103.33L183.097 100.137V105.724L179.639 108.917L184.561 111.976ZM217.227 79.963L209.435 74.707L200.323 78.142L204.545 83.4097L208.754 80.7489L210.543 81.9609L209.504 86.1523L192.685 85.5862L189.495 88.7532L204.057 100.797L209.647 97.9453L202.603 92.0904L215.89 91.823L217.227 79.963Z"
              fill="#23F69A"
            />
          </svg>
        </S.Logo>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputWrapper>
            <Input
              maxLength={11}
              label="전화번호"
              readOnly={showVerification}
              errors={!!errors.phoneNumber}
              message={errors.phoneNumber?.message}
              placeholder="전화번호를 입력해주세요"
              register={register("phoneNumber", {
                required: "전화번호를 입력하지 않았습니다",
                pattern: {
                  value: /^[0-9]{10,11}$/,
                  message: "올바른 전화번호 형식을 입력해주세요",
                },
              })}
            />
            {showVerification && (
              <Input
                maxLength={6}
                label="인증번호"
                errors={!!errors.verificationCode}
                message={errors.verificationCode?.message}
                placeholder="인증번호를 입력해주세요"
                register={register("verificationCode", {
                  required: "인증번호를 입력하지 않았습니다",
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "인증번호는 6자리의 숫자로 입력해주세요",
                  },
                })}
              />
            )}
          </InputWrapper>
          <SubmitWrapper>
            <div>
              <button type="button" onClick={handleButtonClick}>
                {showVerification ? "이전으로" : "넘어가기"}
              </button>
              <button type="submit" className={Object.keys(errors).length === 0 ? "SubmitOK" : ""}>
                {showVerification ? "인증하기" : "인증번호"}
              </button>
            </div>
          </SubmitWrapper>
        </Form>
      </S.Wrapper>
    </S.Layout>
  );
}
