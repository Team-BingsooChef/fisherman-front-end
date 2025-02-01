export interface FishingSpotSearchResponseBody {
  nothing: string;
}

export interface CoinQueryResponseBody {
  coin: number;
}

export interface UserInfoChangeRequestBody {
  nickname: string;
  public: boolean;
  password: string;
}

export interface UserInfoChangeParams {
  field?: UserField;
}

type UserField = "nickname" | "public" | "password";

export interface UserInfoQueryResponseBody {
  email: string;
  nickname: string;
  public: boolean;
}
