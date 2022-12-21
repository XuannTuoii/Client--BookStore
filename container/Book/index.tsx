import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Box, Button, Rating, TextField, Typography } from "@mui/material";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { ConfirmDialog } from "primereact/confirmdialog"; // To use <ConfirmDialog> tag
import { useStore } from "../../store";
import { toast } from "react-toastify";
import ConvertTime from "../Order/convertTime";
import { useRouter } from "next/router";

const BookDetail = () => {
  const {
    book,
    listComment,
    isLoggedIn,
    addComment,
    getABook,
    getAllComment,
    makeAnOrder,
    user,
    success,
    isSuccess,
    setIsSuccess,
    isError,
    setIsError,
    errorMessage,
  } = useStore();
  const router = useRouter();
  const { slug } = router.query;
  const [rating, setRating] = React.useState(5); //number of star
  const [number, setNumber] = React.useState(1); // number of book
  const [visible, setVisible] = React.useState(false);
  const [cmtContent, setCmtContent] = React.useState("");
  const [bookData, setBookData] = useState({
    img_url: "",
    description: "",
    name: "",
    author: "",
    pageCount: 0,
    publishedDate: "",
  });
  const [isLogIn, setIsLogIn] = useState(false);

  //
  const [listCommentData, setListCommentData] = useState([]);
  const accept = () => {
    makeAnOrder({
      userId: user._id,
      author: bookData.author,
      number: number,
      bookSlug: bookData.slug,
      bookId: bookData._id,
      userName: user.username,
      email: user.email,
      bookName: bookData.name,
      bookImg: bookData.img_url,
    });
  };
  const addAComment = () => {
    if (cmtContent.trim() === "") {
      alert("Please enter your comment!");
      return;
    }
    addComment({
      rating: rating,
      belongTo: user?.username,
      content: cmtContent,
      cmtForBook: bookData.slug,
    });
    getAllComment({
      slug: bookData.slug,
    });
    setCmtContent("");
  };
  useEffect(() => {
    // const { slug } = router.query;
    if (slug) {
      getABook({
        slug: slug,
      });
      getAllComment({
        slug: slug,
      });
    }
  }, [slug]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(success, {
        position: "top-center",
      });
    }
    setIsSuccess(false);
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage, {
        position: "top-center",
      });
    }
    setIsError(false);
  }, [isError]);

  useEffect(() => {
    if (book) {
      setBookData(book);
    }
  }, [book]);

  useEffect(() => {
    if (isLoggedIn) {
      setIsLogIn(isLoggedIn);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (listComment) {
      setListCommentData(listComment);
    }
  }, [listComment]);

  return (
    <Box>
      {/* list book */}
      <Box
        sx={{
          paddingTop: "4rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            width: "36rem",
            height: "50rem",
            position: "relative",
            "&  img": {
              objectFit: "cover",
            },
          }}
        >
          <Image
            src={
              bookData.img_url ||
              "https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010__340.jpg"
            }
            layout="fill"
            style={{
              objectFit: "cover",
              borderRadius: "1.2rem",
            }}
          />
        </Box>
        <Box
          sx={{
            maxWidth: "85rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            paddingTop: "2rem",
          }}
        >
          <Typography
            sx={{
              fontSize: "5rem",
              fontWeight: "600",
              fontFamily: "Roboto",
              paddingBottom: "2rem",
              textTransform: "capitalize",
            }}
          >
            {bookData?.name}
          </Typography>
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                paddingBottom: "4rem",
              }}
            >
              <Rating
                value={rating}
                readOnly={!isLogIn}
                onChange={(event: any, newValue: any) => {
                  setRating(newValue);
                }}
                sx={{
                  color: "#ff764c",
                  fontSize: "2.4rem",
                  paddingRight: "2rem",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  paddingRight: "3rem",
                }}
              >
                <ChatRoundedIcon
                  sx={{
                    fontSize: "2.4rem",
                    color: "#6c5dd4",
                    marginRight: "1rem",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "500",
                    fontFamily: "Roboto",
                  }}
                >
                  120 Reviews
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  paddingRight: "3rem",
                }}
              >
                <ThumbUpRoundedIcon
                  sx={{
                    fontSize: "2.4rem",
                    color: "#6c5dd4",
                    marginRight: "1rem",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "500",
                    fontFamily: "Roboto",
                  }}
                >
                  460 Like
                </Typography>
              </Box>
            </Box>
            <Typography
              sx={{
                fontSize: "1.6rem",
                fontWeight: "400",
                fontFamily: "Roboto",
                paddingBottom: "2rem",
                color: "#6b6b6b",
              }}
            >
              {bookData?.description}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.4rem",
                    fontWeight: "400",
                    fontFamily: "Roboto",
                    paddingBottom: "1rem",
                    color: "#bcbcbc",
                  }}
                >
                  Writen by
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.8rem",
                    fontWeight: "500",
                    fontFamily: "Roboto",
                    paddingBottom: "1.2rem",
                    color: "#000",
                  }}
                >
                  {bookData?.author}
                </Typography>
              </Box>
              <Box
                sx={{
                  padding: "0 4rem",
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.4rem",
                    fontWeight: "400",
                    fontFamily: "Roboto",
                    paddingBottom: "1rem",
                    color: "#bcbcbc",
                  }}
                >
                  Page count
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.8rem",
                    fontWeight: "500",
                    fontFamily: "Roboto",
                    paddingBottom: "1.2rem",
                    color: "#000",
                  }}
                >
                  {bookData?.pageCount}
                </Typography>
              </Box>
              <Box
                sx={{
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.4rem",
                    fontWeight: "400",
                    fontFamily: "Roboto",
                    paddingBottom: "1rem",
                    color: "#bcbcbc",
                  }}
                >
                  Year
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.8rem",
                    fontWeight: "500",
                    fontFamily: "Roboto",
                    paddingBottom: "1.2rem",
                    color: "#000",
                  }}
                >
                  {bookData?.publishedDate}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                border: "none",
                margin: "2rem 0",
                borderTop: " 1px dotted #000",
                color: "#fff",
                backgroundColor: " #fff",
                height: "1px",
                width: "100%",
              }}
            ></Box>

            {!isLogIn && (
              <Typography
                sx={{
                  fontSize: "1.6rem",
                  color: "#6b6b6b",
                  fontWeight: "400",
                  fontFamily: "Roboto",
                  textTransform: "capitalize",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <WarningAmberRoundedIcon
                  sx={{
                    fontSize: "2.4rem",
                    lineHeight: "1.6rem",
                  }}
                />
                Log in to use more feature !
              </Typography>
            )}
            {isLogIn && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "4rem",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #6c5dd4",
                    borderRadius: "10px",
                    padding: "0 2rem",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "3rem",
                      fontWeight: "500",
                      fontFamily: "Roboto",
                      color: "#6c5dd4",
                      userSelect: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      if (number > 1) {
                        setNumber(number - 1);
                      }
                    }}
                  >
                    -
                  </Typography>
                  <Typography
                    sx={{
                      margin: "0 3rem",
                      fontSize: "2rem",
                    }}
                  >
                    {number}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "3rem",
                      cursor: "pointer",
                      fontWeight: "500",
                      fontFamily: "Roboto",
                      color: "#6c5dd4",
                      userSelect: "none",
                    }}
                    onClick={() => setNumber(number + 1)}
                  >
                    +
                  </Typography>
                </Box>
                <Button
                  sx={{
                    fontSize: "1.5rem",
                    padding: "1rem 4rem",
                    borderRadius: "10px",
                    color: "#fff",
                    backgroundColor: "#6c5dd4",
                    "&:hover": {
                      opacity: 0.8,
                      backgroundColor: "#6c5dd4",
                    },
                  }}
                  onClick={() => setVisible(true)}
                >
                  <ShoppingCartOutlinedIcon
                    sx={{
                      fontSize: "2.4rem",
                      marginRight: "2rem",
                    }}
                  />
                  Mua
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      {/* list comment */}
      <Box
        sx={{
          paddingTop: "8rem",
        }}
      >
        <Typography
          sx={{
            fontSize: "2.8rem",
            fontWeight: "600",
            fontFamily: "Roboto",
            paddingBottom: "4rem",
            color: "#000",
          }}
        >
          Customer Reviews
        </Typography>
        {listCommentData.length == 0 && (
          <Typography
            sx={{
              fontSize: "1.6rem",
              fontWeight: "400",
              fontFamily: "Roboto",
            }}
          >
            No comment
          </Typography>
        )}
        {listCommentData.map((comment: any, i: any) => {
          console.log("cmt:", comment);

          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "2rem ",
                margin: "2rem 0",
                border: "1px solid #ccc",
                backgroundColor: "rgba(255,255,255,0.7)",
                borderRadius: "1rem",
              }}
              key={i}
            >
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    paddingBottom: "1rem",
                  }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1671229381042-0d157ad8f459?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                    width={60}
                    height={60}
                    style={{ borderRadius: "1rem" }}
                  />
                  <Box
                    sx={{
                      paddingLeft: "2rem",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1.4rem",
                        fontWeight: "500",
                        fontFamily: "Libre Caslon Text",
                        paddingBottom: "1rem",
                      }}
                    >
                      {comment.belongTo}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "1.2rem",
                        fontWeight: "400",
                        fontFamily: "Roboto",
                        color: "#2d7e76",
                      }}
                    >
                      {ConvertTime(comment.createdAt)}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  sx={{
                    fontSize: "1.4rem",
                    fontWeight: "400",
                    fontFamily: "Roboto",
                  }}
                >
                  {comment.content}
                </Typography>
              </Box>
              <Box
                sx={{
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "2.4rem",
                    fontWeight: "600",
                    fontFamily: "Roboto",
                    paddingBottom: "0.6rem",
                    color: "#ff764c",
                  }}
                >
                  {comment.rating}
                </Typography>
                <Rating
                  sx={{
                    color: "#ff764c",
                    fontSize: "2.6rem",
                    paddingRight: "2rem",
                  }}
                  name="read-only"
                  value={comment.rating}
                  readOnly
                />
              </Box>
            </Box>
          );
        })}
        {/* Input comment  */}
        {isLogIn && (
          <Box
            sx={{
              width: "100%",
              paddingTop: "1.6rem",
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <TextField
              value={cmtContent}
              sx={{
                width: "90%",
                "& > label": {
                  paddingBottom: "1rem",
                  fontSize: "1.6rem",
                },
                "& > div": {
                  marginTop: "30px !important",
                  "& > input": {
                    fontSize: "1.4rem",
                    paddingLeft: "1.2rem",
                  },
                },
              }}
              id="standard-basic"
              label="Comment"
              variant="standard"
              onChange={(e) => setCmtContent(e.target.value)}
            />
            <Button
              sx={{
                fontSize: "1.4rem",
                marginLeft: "1.6rem",
              }}
              onClick={addAComment}
            >
              Gửi
            </Button>
          </Box>
        )}
      </Box>
      <ConfirmDialog
        visible={visible}
        onHide={() => setVisible(false)}
        message="Bạn có chắc muốn mua cuốn sách này?"
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        accept={accept}
        style={{ fontSize: "1.6rem" }}
      />
    </Box>
  );
};

export default BookDetail;
