import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import { useRouter } from "next/router";
const ContenHome = ({ listBookData }: any) => {
  const router = useRouter();
  return (
    <Box>
      <Box
        sx={{
          padding: "5rem 0 5rem 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            paddingLeft: "6rem",
          }}
        >
          <Typography
            sx={{
              fontSize: "8rem",
              fontWeight: "600",
              maxWidth: "500px",
              fontFamily: "Libre Caslon Text",
              color: "#2c1810",
            }}
          >
            Find your best friend
          </Typography>
          <Typography
            sx={{
              fontSize: "2rem",
              fontWeight: "300",
              color: "#91857e",
              fontFamily: "Roboto",
              marginTop: "1rem",
            }}
          >
            21 Books from 2022 to put on your back to school reading list
          </Typography>
        </Box>
        <Image src="/img/desk.jpg" width={600} height={600} />
      </Box>
      {/* List book */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          "& > .swiper ": {
            paddingBottom: "3rem",
            "& .swiper-pagination": {
              bottom: "0",
              "& > .swiper-pagination-bullet-active": {
                backgroundColor: "#6c5dd4",
              },
            },
          },
        }}
      >
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          {listBookData.map((item: any, index: number) => {
            return (
              <SwiperSlide key={index}>
                <Box
                  sx={{
                    width: "36rem",
                    minHeight: "57rem",
                    border: "1px solid #ccc",
                    borderRadius: "1.6rem",
                    backgroundColor: "#fff",
                  }}
                >
                  <Box
                    sx={{
                      width: "36rem",
                      height: "20rem",
                      position: "relative",
                      borderTopLeftRadius: "1.6rem",
                      borderTopRightRadius: "1.6rem",
                      "&  img": {
                        objectFit: "cover",
                      },
                    }}
                  >
                    <Image
                      src={
                        item?.img_url ||
                        "https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010__340.jpg"
                      }
                      layout="fill"
                      style={{
                        objectFit: "cover",
                        borderTopLeftRadius: "1.2rem",
                        borderTopRightRadius: "1.2rem",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      padding: "2.4rem 2rem",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "2.8rem",
                        fontWeight: "600",
                        fontFamily: "Roboto",
                        paddingBottom: "1rem",
                      }}
                    >
                      {item?.name}
                    </Typography>
                    <Box
                      sx={{
                        padding: "0.5rem 1rem",
                        backgroundColor: "#f1eeff",
                        borderRadius: "1rem",
                        color: "#6c5dd4",
                        width: "fit-content",
                        fontWeight: "600",
                        fontSize: "1.2rem",
                        marginBottom: "1.6rem",
                      }}
                    >
                      {item?.type}
                    </Box>
                    <Typography
                      sx={{
                        fontSize: "1.4rem",
                        color: "#545454",
                        fontWeight: "400",
                        fontFamily: "Roboto",
                        paddingBottom: "1rem",
                      }}
                    >
                      {item?.description}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "1.4rem",
                        color: "#000",
                        fontWeight: "600",
                        fontFamily: "Libre Caslon Text",
                        padding: "2rem 0",
                      }}
                    >
                      {item?.author}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        sx={{
                          backgroundColor: "#6c5dd4",
                          color: "#fff",
                          padding: "0.8rem 2rem",
                          borderRadius: "1rem",
                          fontWeight: "600",
                          fontSize: "1.2rem",
                          textTransform: "capitalize",
                          "&:hover": {
                            opacity: 0.8,
                            backgroundColor: "#6c5dd4",
                          },
                        }}
                        onClick={() => {
                          router.push(`/book/${item?.slug}`);
                        }}
                      >
                        More detail
                      </Button>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "2.4rem",
                            paddingRight: "0.5rem",
                            color: "#2c1810",
                            fontWeight: "500",
                          }}
                        >
                          {item?.pageCount}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "1.4rem",
                            color: "#91857e",
                          }}
                        >
                          pages
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
    </Box>
  );
};

export default ContenHome;
